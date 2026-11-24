// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChainOfThought,
  ChatConversation,
  ChatMessage
} from '@vezham/react-pro-v3'
import { Markdown } from '@vezham/react-pro-v3/markdown'

const MESSAGES = [
  {
    id: '1',
    role: 'user' as const,
    text: 'How does auto-scroll work in chat UIs?'
  },
  {
    id: '2',
    role: 'assistant' as const,
    text: `Stick-to-bottom keeps the viewport pinned to the latest message while you stream.

It also leaves the user in control: once they scroll away from the bottom, new content can arrive without snapping the viewport away from what they are reading.`
  },
  {
    id: '3',
    role: 'user' as const,
    text: 'What happens when the assistant is doing multiple steps?'
  },
  {
    id: '4',
    role: 'assistant' as const,
    text: `You can combine the conversation viewport with reasoning and tool UI so the whole exchange remains in one scrollable surface.`,
    trace: true
  }
]

export function Default() {
  return (
    <div className="flex h-[520px] w-[640px] flex-col overflow-hidden">
      <ChatConversation className="flex-1">
        <ChatConversation.Content className="max-w-[714px] flex-col gap-8 px-4 pt-8 pb-8">
          {MESSAGES.map(message =>
            message.role === 'user' ? (
              <ChatMessage.User key={message.id}>
                <ChatMessage.Bubble>
                  <ChatMessage.Content>{message.text}</ChatMessage.Content>
                </ChatMessage.Bubble>
              </ChatMessage.User>
            ) : (
              <ChatMessage.Assistant key={message.id}>
                <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
                <ChatMessage.Body>
                  <ChatMessage.Content>
                    <Markdown>{message.text}</Markdown>
                  </ChatMessage.Content>
                  {'trace' in message && message.trace ? (
                    <ChainOfThought defaultExpanded>
                      <ChainOfThought.Trigger>
                        Thought for 2s
                      </ChainOfThought.Trigger>
                      <ChainOfThought.Content>
                        <ChainOfThought.Steps>
                          <ChainOfThought.Step label="Check scroll behavior">
                            Verified the viewport remains pinned while the
                            assistant streams.
                          </ChainOfThought.Step>
                          <ChainOfThought.Step label="Compose response">
                            Added reasoning UI inline with the assistant message
                            body.
                          </ChainOfThought.Step>
                        </ChainOfThought.Steps>
                      </ChainOfThought.Content>
                    </ChainOfThought>
                  ) : null}
                </ChatMessage.Body>
              </ChatMessage.Assistant>
            )
          )}
        </ChatConversation.Content>
      </ChatConversation>
    </div>
  )
}
