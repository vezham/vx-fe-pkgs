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

it('notifies model subscribers after provider plugin enablement changes', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(Response.json([]))
    .mockResolvedValueOnce(
      Response.json({ message: 'Access denied' }, { status: 403 })
    )
  const client = createTamizhiClient({
    baseURL: 'http://localhost/api/tamizhi',
    fetch
  })
  const changed = vi.fn()
  client.subscribeProviderChanges?.(changed)
  await client.api?.setPlugin('provider.leo', false)
  expect(changed).toHaveBeenCalledTimes(1)
  await expect(client.api?.setPlugin('provider.leo', true)).rejects.toThrow(
    'Access denied'
  )
  expect(changed).toHaveBeenCalledTimes(1)
})

it('saves search opt-in without sending a provider key and notifies after confirmation', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(
      Response.json({ id: 'deepseek', searchEnabled: true })
    )
    .mockResolvedValueOnce(
      Response.json({ message: 'Unavailable' }, { status: 503 })
    )
  const client = createTamizhiClient({
    baseURL: 'http://localhost/api/tamizhi',
    fetch
  })
  const changed = vi.fn()
  client.subscribeProviderChanges?.(changed)
  await client.api?.setProviderSearch('deepseek', true)
  expect(fetch.mock.calls[0]?.[0]).toBe(
    'http://localhost/api/tamizhi/providers/deepseek/search'
  )
  expect(fetch.mock.calls[0]?.[1]?.method).toBe('PUT')
  expect(JSON.parse(String(fetch.mock.calls[0]?.[1]?.body))).toEqual({
    enabled: true
  })
  expect(changed).toHaveBeenCalledTimes(1)
  await expect(
    client.api?.setProviderSearch('deepseek', false)
  ).rejects.toThrow('Unavailable')
  expect(changed).toHaveBeenCalledTimes(1)
})
