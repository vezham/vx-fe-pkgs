import { renderHook } from '@testing-library/react'
import { type ReactNode, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { CommandContext, useCommand } from '../index'

describe('useCommand', () => {
  it('requires a command provider', () => {
    expect(() => renderHook(() => useCommand())).toThrow(
      'useCommand must be used within CommandProvider'
    )
  })

  it('shares the provider context and its actions', () => {
    const value = {
      isOpen: true,
      openCommand: vi.fn(),
      closeCommand: vi.fn(),
      toggleCommand: vi.fn()
    }
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(CommandContext.Provider, { value }, children)
    const { result } = renderHook(() => useCommand(), { wrapper })

    expect(result.current).toBe(value)
    result.current.toggleCommand()
    expect(value.toggleCommand).toHaveBeenCalledOnce()
  })
})
