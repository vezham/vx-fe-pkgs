import type { StreamChunk } from '@tanstack/ai'
import { ChatClient } from '@tanstack/ai-client'
import type { ConnectConnectionAdapter, UIMessage } from '@tanstack/ai-client'
import { EventType } from '@tanstack/ai/client'

import type { RunRequest, StreamEvent } from '@vezham/tamizhi-contracts'
import { runRequestSchema } from '@vezham/tamizhi-contracts'

import type { TamizhiClient } from './client'

interface ConnectionOptions {
  request?: RunRequest
  permission?: RunRequest['permission']
  model?: string
  fast?: boolean
  onEvent?: (event: StreamEvent) => void | Promise<void>
}
const inputText = (message: UIMessage | { content: unknown }) => {
  if ('parts' in message)
    return message.parts
      .filter(part => part.type === 'text')
      .map(part => (part.type === 'text' ? part.content : ''))
      .join('')
  return typeof message.content === 'string'
    ? message.content
    : JSON.stringify(message.content)
}
// vx-bot/NOTE: TanStack consumes the stream; Go remains the only agent/tool executor.
export const createTamizhiConnection = (
  client: TamizhiClient,
  options: ConnectionOptions = {}
): ConnectConnectionAdapter => ({
  async *connect(
    messages,
    _data,
    signal,
    context
  ): AsyncGenerator<StreamChunk> {
    const request =
      options.request ??
      runRequestSchema.parse({
        conversationId: context.threadId,
        messages: messages
          .filter(
            message => message.role === 'user' || message.role === 'assistant'
          )
          .map(message => ({
            id: message.id,
            role: message.role,
            content: inputText(message)
          })),
        permission: options.permission ?? 'ask',
        model: options.model,
        fast: options.fast ?? false
      })
    let messageId = ''
    let textStarted = false
    for await (const event of client.stream(request, signal)) {
      signal?.throwIfAborted()
      await options.onEvent?.(event)
      if (event.type === 'start')
        yield {
          type: EventType.RUN_STARTED,
          threadId: event.conversationId,
          runId: event.runId
        }
      else if (event.type === 'text') {
        if (!textStarted) {
          messageId = event.runId + ':assistant'
          textStarted = true
          yield {
            type: EventType.TEXT_MESSAGE_START,
            messageId,
            role: 'assistant'
          }
        }
        yield {
          type: EventType.TEXT_MESSAGE_CONTENT,
          messageId,
          delta: event.delta
        }
      } else if (event.type === 'tool') {
        yield {
          type: EventType.TOOL_CALL_START,
          toolCallId: event.callId,
          toolCallName: event.name
        }
        yield {
          type: EventType.TOOL_CALL_ARGS,
          toolCallId: event.callId,
          delta: JSON.stringify(event.input)
        }
        yield { type: EventType.TOOL_CALL_END, toolCallId: event.callId }
      } else if (event.type === 'tool-result') {
        yield {
          type: EventType.TOOL_CALL_RESULT,
          toolCallId: event.callId,
          messageId: event.callId + ':result',
          content: JSON.stringify(event.output),
          role: 'tool'
        }
      } else if (event.type === 'finish') {
        if (textStarted) yield { type: EventType.TEXT_MESSAGE_END, messageId }
        yield {
          type: EventType.RUN_FINISHED,
          threadId: event.conversationId,
          runId: event.runId
        }
      } else if (event.type === 'error')
        yield { type: EventType.RUN_ERROR, message: event.message }
      else yield { type: EventType.CUSTOM, name: 'tamizhi', value: event }
    }
  }
})

// vx-bot/NOTE: Keep the current persisted conversation/UI records while TanStack assembles live assistant text.
export const runTamizhiChat = async (
  client: TamizhiClient,
  request: RunRequest,
  callbacks: {
    onText: (text: string) => void
    onEvent: (event: StreamEvent) => void | Promise<void>
  },
  signal?: AbortSignal
) => {
  let failure: Error | undefined
  let previous = ''
  const chat = new ChatClient({
    threadId: request.conversationId,
    connection: createTamizhiConnection(client, {
      request,
      onEvent: callbacks.onEvent
    }),
    onMessagesChange: messages => {
      const message = [...messages]
        .reverse()
        .find(item => item.role === 'assistant')
      const text = message?.parts
        .filter(part => part.type === 'text')
        .map(part => (part.type === 'text' ? part.content : ''))
        .join('')
      if (text !== undefined && text !== previous) {
        previous = text
        callbacks.onText(text)
      }
    },
    onError: error => {
      failure = error
    }
  })
  const abort = () => chat.stop()
  if (signal?.aborted) {
    chat.dispose()
    signal.throwIfAborted()
  }
  signal?.addEventListener('abort', abort, { once: true })
  try {
    await chat.sendMessage(request.messages.at(-1)?.content ?? '')
    signal?.throwIfAborted()
    if (failure) throw failure
  } finally {
    signal?.removeEventListener('abort', abort)
    chat.dispose()
  }
}
