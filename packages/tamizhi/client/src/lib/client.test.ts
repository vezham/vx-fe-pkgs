import { expect, it, vi } from 'vitest'

import { createTamizhiClient } from './client'

const response = (events: unknown[]) =>
  new Response(
    events.map(event => `data: ${JSON.stringify(event)}\n\n`).join(''),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'X-Tamizhi-Run-ID': 'run'
      }
    }
  )
it('reconnects a truncated stream without posting the prompt twice or duplicating text', async () => {
  const identity = { runId: 'run', conversationId: 'chat' }
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(
      response([
        { ...identity, type: 'start', sequence: 1 },
        { ...identity, type: 'text', delta: 'Hello ', sequence: 2 }
      ])
    )
    .mockResolvedValueOnce(
      response([
        { ...identity, type: 'text', delta: 'Hello ', sequence: 2 },
        { ...identity, type: 'text', delta: 'world', sequence: 3 },
        { ...identity, type: 'finish', reason: 'complete', sequence: 4 }
      ])
    )
  const client = createTamizhiClient({
    baseURL: 'https://api.example/api/tamizhi',
    fetch
  })
  const events = []
  for await (const event of client.stream({
    conversationId: 'chat',
    messages: [{ id: 'user', role: 'user', content: 'hello' }],
    fast: false,
    permission: 'ask'
  }))
    events.push(event)
  expect(events.map(event => event.sequence)).toEqual([1, 2, 3, 4])
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(fetch.mock.calls[0]?.[1]?.method).toBe('POST')
  expect(fetch.mock.calls[1]?.[0]).toBe(
    'https://api.example/api/tamizhi/runs/run/events?after=2'
  )
  expect(fetch.mock.calls[1]?.[1]?.method).toBeUndefined()
})
it('uses the cancellation endpoint and preserves FormData upload boundaries', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockImplementation(async (_input, init) => {
      if (init?.body instanceof FormData) {
        expect(new Headers(init.headers).has('Content-Type')).toBe(false)
        return Response.json({
          id: 'attachment',
          name: 'notes.txt',
          mimeType: 'text/plain',
          size: 2
        })
      }
      return new Response(null, { status: 204 })
    })
  const client = createTamizhiClient({
    baseURL: 'https://api.example/api/tamizhi',
    fetch
  })
  const api = client.api
  if (!api) throw new Error('Missing API methods')
  await api.cancel('run')
  await api.upload(new File(['hi'], 'notes.txt'))
  expect(fetch.mock.calls[0]?.[0]).toBe(
    'https://api.example/api/tamizhi/runs/run/cancel'
  )
  expect(fetch.mock.calls[0]?.[1]?.method).toBe('POST')
})
