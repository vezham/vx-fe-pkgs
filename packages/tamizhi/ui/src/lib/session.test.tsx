import { act, cleanup, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import { TamizhiSessionProvider, useTamizhiSession } from './session'
import { useTamizhiChat } from './use-tamizhi-chat'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('keeps the embedded session across panel unmounts and independent from the standalone history', async () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TamizhiSessionProvider storageKey="test:embed">
      {children}
    </TamizhiSessionProvider>
  )
  const host = renderHook(() => useTamizhiSession(), { wrapper })
  const standalone = renderHook(() => useTamizhiChat(true))
  await vi.waitFor(() => expect(host.result.current.chat.isReady).toBe(true))
  await vi.waitFor(() => expect(standalone.result.current.isReady).toBe(true))
  act(() => host.result.current.chat.send('Plan my day'))
  await act(async () => vi.advanceTimersByTimeAsync(5000))
  const id = host.result.current.chat.activeId
  host.rerender()
  expect(host.result.current.chat.activeId).toBe(id)
  expect(host.result.current.chat.messages).toHaveLength(2)
  expect(standalone.result.current.conversations).toHaveLength(0)
  await vi.waitFor(() => expect(host.result.current.chat.isSaved).toBe(true))
  host.unmount()
  const reopened = renderHook(() => useTamizhiSession(), { wrapper })
  await vi.waitFor(() =>
    expect(reopened.result.current.chat.conversations[0]?.id).toBe(id)
  )
})
