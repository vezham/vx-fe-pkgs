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
