import { act, cleanup, renderHook } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useLocalStore } from '.'

beforeEach(() => localStorage.clear())
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('useLocalStore', () => {
  it('hydrates prerendered markup without reading storage during render or replacing saved data', async () => {
    localStorage.setItem('prerender', '7')
    const read = vi.spyOn(Storage.prototype, 'getItem')
    const write = vi.spyOn(Storage.prototype, 'setItem')
    const Counter = () => <output>{useLocalStore('prerender', 0).value}</output>
    const markup = renderToString(<Counter />)
    expect(markup).toContain('0')
    expect(read).not.toHaveBeenCalled()
    const container = document.createElement('div')
    container.innerHTML = markup
    document.body.append(container)
    const onRecoverableError = vi.fn()
    let hydrated: ReturnType<typeof hydrateRoot> | undefined
    await act(async () => {
      hydrated = hydrateRoot(container, <Counter />, { onRecoverableError })
    })
    expect(container.textContent).toBe('7')
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(write).not.toHaveBeenCalled()
    await act(async () => hydrated?.unmount())
    container.remove()
  })

  it('shares functional updates between consumers and resets only its own key', () => {
    localStorage.setItem('unrelated', 'keep')
    const a = renderHook(() => useLocalStore('shared', 0))
    const b = renderHook(() => useLocalStore('shared', 0))
    act(() => {
      a.result.current.setValue(n => n + 1)
      b.result.current.setValue(n => n + 1)
    })
    expect(a.result.current.value).toBe(2)
    expect(b.result.current.value).toBe(2)
    act(() => b.result.current.reset())
    expect(a.result.current.value).toBe(0)
    expect(localStorage.getItem('shared')).toBeNull()
    expect(localStorage.getItem('unrelated')).toBe('keep')
  })

  it('reacts to another tab and clear without echoing writes', () => {
    const { result } = renderHook(() => useLocalStore('tabs', 0))
    localStorage.setItem('tabs', '3')
    const write = vi.spyOn(Storage.prototype, 'setItem')
    act(() =>
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'tabs',
          newValue: '3',
          storageArea: localStorage
        })
      )
    )
    expect(result.current.value).toBe(3)
    localStorage.clear()
    act(() =>
      window.dispatchEvent(
        new StorageEvent('storage', { key: null, storageArea: localStorage })
      )
    )
    expect(result.current.value).toBe(0)
    expect(write).not.toHaveBeenCalled()
  })

  it('keeps malformed data intact until an intentional update and recovers from denied storage', () => {
    localStorage.setItem('invalid', '{bad')
    const { result } = renderHook(() => useLocalStore('invalid', 0))
    expect(result.current.isReady).toBe(true)
    expect(result.current.isSaved).toBe(false)
    expect(localStorage.getItem('invalid')).toBe('{bad')
    const write = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Quota exceeded')
      })
    act(() => result.current.setValue(2))
    expect(result.current.value).toBe(2)
    expect(result.current.isSaved).toBe(false)
    write.mockRestore()
    act(() => result.current.flush())
    expect(localStorage.getItem('invalid')).toBe('2')
    expect(result.current.isSaved).toBe(true)
  })

  it('uses the caller parser and survives storage read errors', () => {
    localStorage.setItem('typed', '"wrong"')
    const parse = (value: unknown) => {
      if (typeof value !== 'number') throw new Error('Invalid number')
      return value
    }
    const typed = renderHook(() => useLocalStore('typed', 0, { parse }))
    expect(typed.result.current.value).toBe(0)
    expect(typed.result.current.error).toBeInstanceOf(Error)
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage blocked')
    })
    const denied = renderHook(() => useLocalStore('denied', 4))
    expect(denied.result.current.value).toBe(4)
    expect(denied.result.current.isReady).toBe(true)
    expect(denied.result.current.isSaved).toBe(false)
  })

  it('debounces streaming writes, flushes on exit, and isolates changing keys', () => {
    vi.useFakeTimers()
    const write = vi.spyOn(Storage.prototype, 'setItem')
    const hook = renderHook(
      ({ key }) => useLocalStore(key, '', { debounceMs: 150 }),
      {
        initialProps: { key: 'a' }
      }
    )
    act(() => hook.result.current.setValue('one'))
    act(() => vi.advanceTimersByTime(70))
    act(() => hook.result.current.setValue('one two'))
    act(() => vi.advanceTimersByTime(70))
    expect(write).not.toHaveBeenCalled()
    act(() => window.dispatchEvent(new Event('pagehide')))
    expect(localStorage.getItem('a')).toBe('"one two"')
    hook.rerender({ key: 'b' })
    expect(hook.result.current.value).toBe('')
    act(() => hook.result.current.setValue('other'))
    hook.unmount()
    expect(localStorage.getItem('b')).toBe('"other"')
    expect(localStorage.getItem('a')).toBe('"one two"')
  })
})
