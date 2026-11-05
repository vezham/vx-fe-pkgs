import { expect, it, vi } from 'vitest'

import type { StreamEvent } from '@vezham/tamizhi-contracts'

import type { TamizhiClient } from './client'
import { createTamizhiConnection, runTamizhiChat } from './connection'

const identity = { runId: 'run', conversationId: 'chat' }
const request = {
  conversationId: 'chat',
  messages: [{ role: 'user' as const, content: 'latest React' }],
  permission: 'safe' as const,
  fast: false
}
const fixture = (events: StreamEvent[]): TamizhiClient => ({
  stream: async function* () {
    yield* events
  },
  models: async () => [],
  conversation: vi.fn(),
  approve: async () => undefined
})
it('TanStack assembles incremental text and retains Go approval/source events', async () => {
  const events: StreamEvent[] = [
    { ...identity, type: 'start' },
    { ...identity, type: 'status', name: 'Searching the web' },
    {
      ...identity,
      type: 'tool',
      callId: 'search',
      name: 'web_search',
      input: { query: 'React' }
    },
    {
      ...identity,
      type: 'approval',
      callId: 'search',
      name: 'web_search',
      input: {}
    },
    {
      ...identity,
      type: 'tool-result',
      callId: 'search',
      name: 'web_search',
      output: { sources: [] }
    },
    { ...identity, type: 'text', delta: 'Hello ' },
    { ...identity, type: 'text', delta: 'world' },
    { ...identity, type: 'finish', reason: 'complete' }
  ]
  const text = vi.fn()
  const event = vi.fn()
  await runTamizhiChat(fixture(events), request, {
    onText: text,
    onEvent: event
  })
  expect(text).toHaveBeenLastCalledWith('Hello world')
  expect(event).toHaveBeenCalledWith(
    expect.objectContaining({ type: 'approval' })
  )
  expect(event).toHaveBeenCalledWith(
    expect.objectContaining({ type: 'tool-result' })
  )
})
it('surfaces runtime errors rather than silently completing the response', async () => {
  await expect(
    runTamizhiChat(
      fixture([
        { ...identity, type: 'start' },
        { ...identity, type: 'error', message: 'Provider unavailable' }
      ]),
      request,
      { onText: vi.fn(), onEvent: vi.fn() }
    )
  ).rejects.toThrow('Provider unavailable')
})
it('honors cancellation without starting a second agent loop', async () => {
  const controller = new AbortController()
  controller.abort()
  const client = fixture([])
  const stream = vi.spyOn(client, 'stream')
  await expect(
    runTamizhiChat(
      client,
      request,
      { onText: vi.fn(), onEvent: vi.fn() },
      controller.signal
    )
  ).rejects.toThrow()
  expect(stream).not.toHaveBeenCalled()
})
it('is usable as a normal reusable TanStack connection', async () => {
  const client = fixture([
    { ...identity, type: 'start' },
    { ...identity, type: 'finish', reason: 'complete' }
  ])
  const stream = vi.spyOn(client, 'stream')
  const connection = createTamizhiConnection(client)
  const result = []
  for await (const event of connection.connect(
    [
      {
        id: 'user-one',
        role: 'user',
        parts: [{ type: 'text', content: 'question' }]
      }
    ],
    undefined,
    undefined,
    { threadId: 'chat', runId: 'run' }
  ))
    result.push(event.type)
  expect(result).toEqual(['RUN_STARTED', 'RUN_FINISHED'])
  expect(stream).toHaveBeenCalledWith(
    expect.objectContaining({
      conversationId: 'chat',
      messages: [{ id: 'user-one', role: 'user', content: 'question' }]
    }),
    undefined
  )
})
