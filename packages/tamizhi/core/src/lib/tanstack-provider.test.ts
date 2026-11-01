import { expect, it, vi } from 'vitest'
import { z } from 'zod'

import {
  memoryStoragePlugin,
  permissionPolicyPlugin,
  toolPlugin
} from './plugins'
import { createTamizhi } from './runtime'
import { openaiCompatiblePlugin } from './tanstack-provider'

const response = (chunks: unknown[]) =>
  new Response(
    new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder()
        for (const chunk of chunks)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
          )
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      }
    }),
    { headers: { 'Content-Type': 'text/event-stream' } }
  )
const chunk = (delta: unknown, finish: string | null = null) => ({
  id: 'completion',
  object: 'chat.completion.chunk',
  created: 1,
  model: 'custom-model',
  choices: [{ index: 0, delta, finish_reason: finish }]
})

it('runs a tool and resumes a real TanStack AI chat-completions adapter', async () => {
  const execute = vi.fn(async () => ({ time: '12:00' }))
  const upstream = vi
    .fn<typeof fetch>()
    .mockResolvedValueOnce(
      response([
        chunk({
          role: 'assistant',
          tool_calls: [
            {
              index: 0,
              id: 'call-time',
              type: 'function',
              function: { name: 'clock', arguments: '{}' }
            }
          ]
        }),
        chunk({}, 'tool_calls')
      ])
    )
    .mockResolvedValueOnce(
      response([chunk({ content: 'It is 12:00.' }), chunk({}, 'stop')])
    )
  const host = await createTamizhi({
    plugins: [
      memoryStoragePlugin(),
      permissionPolicyPlugin(),
      toolPlugin({
        name: 'clock',
        description: 'Get current time',
        risk: 'read',
        inputSchema: z.object({}),
        execute
      }),
      openaiCompatiblePlugin({
        id: 'test',
        apiKey: 'test-server-key',
        baseURL: 'https://provider.test/v1',
        models: [{ id: 'custom-model', name: 'Custom', provider: 'test' }],
        fetch: upstream
      })
    ]
  })
  try {
    let text = ''
    for await (const event of host.run(
      {
        conversationId: 'chat',
        messages: [{ role: 'user', content: 'What time?' }],
        permission: 'safe',
        fast: false
      },
      { id: 'alice' }
    )) {
      if (event.type === 'error') throw new Error(event.message)
      if (event.type === 'text') text += event.delta
    }
    expect(text).toBe('It is 12:00.')
    expect(execute).toHaveBeenCalledOnce()
    expect(upstream).toHaveBeenCalledTimes(2)
  } finally {
    await host.dispose()
  }
})
