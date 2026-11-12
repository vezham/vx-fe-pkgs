import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCopyToClipboard } from './index'

const clipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  'clipboard'
)
const execCommandDescriptor = Object.getOwnPropertyDescriptor(
  document,
  'execCommand'
)

afterEach(() => {
  if (clipboardDescriptor)
    Object.defineProperty(navigator, 'clipboard', clipboardDescriptor)
  else Reflect.deleteProperty(navigator, 'clipboard')
  if (execCommandDescriptor)
    Object.defineProperty(document, 'execCommand', execCommandDescriptor)
  else Reflect.deleteProperty(document, 'execCommand')
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('useCopyToClipboard', () => {
  it('copies with the Clipboard API and reports success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    })
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await expect(result.current.copy('hello')).resolves.toBe(true)
    })

    expect(writeText).toHaveBeenCalledWith('hello')
    expect(result.current.isCopied).toBe(true)
  })

  it('falls back to selection copy when the Clipboard API rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Permission denied'))
    const execCommand = vi.fn().mockReturnValue(true)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    })
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommand
    })
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await expect(result.current.copy('hello')).resolves.toBe(true)
    })

    expect(execCommand).toHaveBeenCalledWith('copy')
    expect(result.current.isCopied).toBe(true)
  })

  it('reports when both clipboard methods are unavailable', async () => {
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: vi.fn().mockReturnValue(false)
    })
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await expect(result.current.copy('hello')).resolves.toBe(false)
    })

    expect(result.current.isUnavailable).toBe(true)
  })
})

describe('copy feedback lifecycle', () => {
  const mockClipboard = (writeText = vi.fn().mockResolvedValue(undefined)) => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    })
  }

  const deferred = () => {
    let resolve: () => void = () => undefined
    const promise = new Promise<void>(complete => {
      resolve = complete
    })
    return { promise, resolve }
  }

  it('returns to idle two seconds after a successful copy', async () => {
    vi.useFakeTimers()
    mockClipboard()
    const { result } = renderHook(() => useCopyToClipboard())
    expect(result.current.status).toBe('idle')

    await act(async () => {
      await result.current.copy('hello')
    })
    act(() => vi.advanceTimersByTime(1999))
    expect(result.current.isCopied).toBe(true)
    act(() => vi.advanceTimersByTime(1))
    expect(result.current.status).toBe('idle')
    expect(result.current.isCopied).toBe(false)
  })

  it('restarts the feedback duration on consecutive successful copies', async () => {
    vi.useFakeTimers()
    mockClipboard()
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copy('first')
    })
    act(() => vi.advanceTimersByTime(1500))
    await act(async () => {
      await result.current.copy('second')
    })
    act(() => vi.advanceTimersByTime(500))
    expect(result.current.isCopied).toBe(true)
    act(() => vi.advanceTimersByTime(1500))
    expect(result.current.status).toBe('idle')
  })

  it('does not let an earlier success timer erase a later failure', async () => {
    vi.useFakeTimers()
    const writeText = vi
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('Permission denied'))
    mockClipboard(writeText)
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: vi.fn().mockReturnValue(false)
    })
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copy('first')
    })
    act(() => vi.advanceTimersByTime(1000))
    await act(async () => {
      await expect(result.current.copy('second')).resolves.toBe(false)
    })
    act(() => vi.advanceTimersByTime(3000))
    expect(result.current.isUnavailable).toBe(true)
    expect(result.current.isCopied).toBe(false)
  })

  it('ignores an older copy result that completes after the latest attempt', async () => {
    vi.useFakeTimers()
    const first = deferred()
    mockClipboard(
      vi
        .fn()
        .mockReturnValueOnce(first.promise)
        .mockRejectedValueOnce(new Error('Permission denied'))
    )
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: vi.fn().mockReturnValue(false)
    })
    const { result } = renderHook(() => useCopyToClipboard())
    const firstCopy = result.current.copy('first')

    await act(async () => {
      await result.current.copy('second')
    })
    await act(async () => {
      first.resolve()
      await expect(firstCopy).resolves.toBe(true)
    })
    expect(result.current.isUnavailable).toBe(true)
    act(() => vi.advanceTimersByTime(3000))
    expect(result.current.isUnavailable).toBe(true)
  })

  it('clears the feedback timer on unmount', async () => {
    vi.useFakeTimers()
    mockClipboard()
    const { result, unmount } = renderHook(() => useCopyToClipboard())
    await act(async () => {
      await result.current.copy('hello')
    })

    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('does not schedule feedback when a pending copy resolves after unmount', async () => {
    vi.useFakeTimers()
    const pending = deferred()
    mockClipboard(vi.fn().mockReturnValue(pending.promise))
    const { result, unmount } = renderHook(() => useCopyToClipboard())
    const copy = result.current.copy('hello')
    unmount()

    await act(async () => {
      pending.resolve()
      await expect(copy).resolves.toBe(true)
    })
    expect(vi.getTimerCount()).toBe(0)
  })
})
