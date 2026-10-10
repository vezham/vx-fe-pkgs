import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { useEntityDateControls } from '../src/pages/academic/shared/use-entity-date-controls'

describe('academic date controls', () => {
  it('opens the custom picker and applies a completed range', () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState(3)
      return { page, ...useEntityDateControls(setPage) }
    })

    act(() => result.current.updateDatePreset('custom'))
    expect(result.current.page).toBe(1)
    expect(result.current.isCustomDateRangeOpen).toBe(true)
    expect(result.current.isDateDropdownOpen).toBe(true)
    expect(result.current.activeDateRange).toBeNull()

    act(() =>
      result.current.updateCustomDateRange({
        start: { toString: () => '2026-02-01' },
        end: { toString: () => '2026-02-14' }
      })
    )

    expect(result.current.activeDateRange).toEqual({
      start: '2026-02-01',
      end: '2026-02-14'
    })
    expect(result.current.isCustomDateRangeOpen).toBe(false)
    expect(result.current.isDateDropdownOpen).toBe(false)
  })
})
