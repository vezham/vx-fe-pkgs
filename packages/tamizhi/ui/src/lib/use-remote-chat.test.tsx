import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { createTamizhiClient } from '@vezham/tamizhi-client'
import type { TamizhiClient } from '@vezham/tamizhi-client'

import { useDemoChat } from './use-demo-chat'

afterEach(() => {
  cleanup()
  localStorage.clear()
})
it('streams backend replies and forwards model and permission choices', async () => {
  const client: TamizhiClient = {
    conversation: vi.fn(),
    models: async () => [{ id: 'custom', name: 'Custom', provider: 'test' }],
    approve: vi.fn(),
    stream: vi.fn(async function* (input) {
      const identity = { runId: 'run', conversationId: input.conversationId }
      yield { ...identity, type: 'start' as const }
      yield { ...identity, type: 'text' as const, delta: 'A real ' }
      yield { ...identity, type: 'text' as const, delta: 'stream' }
      yield {
        ...identity,
        type: 'finish' as const,
        reason: 'complete' as const
      }
    })
  }
  const { result } = renderHook(() =>
    useDemoChat(false, undefined, 'test:remote', client)
  )
  await waitFor(() => expect(result.current.models).toHaveLength(1))
  act(() => {
    result.current.configureRun({
      model: 'custom',
      permission: 'safe',
      fast: true
    })
    result.current.send('Hello')
  })
  await waitFor(() => expect(result.current.isStreaming).toBe(false))
  expect(result.current.messages[1].text).toBe('A real stream')
  expect(client.stream).toHaveBeenCalledWith(
    expect.objectContaining({
      model: 'custom',
      permission: 'safe',
      fast: true
    }),
    expect.any(AbortSignal)
  )
})
it('shows backend failure without inserting a prepared demo reply', async () => {
  const client: TamizhiClient = {
    conversation: vi.fn(),
    models: async () => [],
    approve: vi.fn(),
    stream: async function* (input) {
      yield {
        type: 'error',
        runId: 'r',
        conversationId: input.conversationId,
        message: 'Provider unavailable'
      }
    }
  }
  const { result } = renderHook(() =>
    useDemoChat(false, undefined, 'test:failure', client)
  )
  act(() => {
    result.current.send('Hello')
  })
  await waitFor(() => expect(result.current.error).toBe('Provider unavailable'))
  expect(result.current.messages).toHaveLength(1)
})

it('loads canonical remote IDs and keeps server history out of demo local storage', async () => {
  const saved = {
    id: 'remote-chat',
    title: 'Server chat',
    updatedAt: 1,
    version: 3,
    messages: [
      { id: 'server-user', role: 'user', content: 'hello' },
      { id: 'server-call', role: 'assistant', content: '' },
      { id: 'server-tool', role: 'tool', content: '{"result":"ok"}' },
      {
        id: 'server-answer',
        role: 'assistant',
        content: 'Saved answer',
        rating: 'like'
      }
    ]
  }
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockImplementation(async input => {
      const path = new URL(String(input)).pathname
      if (path.endsWith('/models')) return Response.json([])
      if (path.endsWith('/capabilities'))
        return Response.json({ version: '1', sessions: true })
      if (path.endsWith('/conversations'))
        return Response.json({ items: [saved] })
      return Response.json(saved)
    })
  const client = createTamizhiClient({
    baseURL: 'https://api.example/api/tamizhi',
    fetch
  })
  const { result } = renderHook(() =>
    useDemoChat(false, 'remote-chat', 'test:server-owned', client)
  )
  await waitFor(() => expect(result.current.messages).toHaveLength(2))
  expect(result.current.messages[1]).toMatchObject({
    id: 'server-answer',
    text: 'Saved answer',
    rating: 'up'
  })
  act(() => result.current.rate('server-answer', 'down'))
  await waitFor(() =>
    expect(
      fetch.mock.calls.some(([input]) =>
        String(input).endsWith('/messages/server-answer/feedback')
      )
    ).toBe(true)
  )
  expect(localStorage.getItem('test:server-owned')).toBeNull()
})
