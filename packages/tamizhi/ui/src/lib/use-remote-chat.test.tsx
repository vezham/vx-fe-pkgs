import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

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
