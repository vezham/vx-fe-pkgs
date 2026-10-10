import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useEntityRowNavigation } from '../src/pages/academic/shared/use-entity-row-navigation'

describe('academic row navigation', () => {
  it('moves between rows, updates pagination, and keeps edit mode in the URL', () => {
    const rows = [
      { id: 'first', name: 'First' },
      { id: 'second', name: 'Second' }
    ]
    const updateDrawerQuery = vi.fn()
    const { result } = renderHook(() => {
      const [activeRowId, setActiveRowId] = useState<string | null>(null)
      const [form, setForm] = useState({ name: '' })
      const [mode, setMode] = useState<'view' | 'edit' | 'create'>('edit')
      const [page, setPage] = useState(1)
      const navigation = useEntityRowNavigation({
        currentPage: page,
        mode,
        pageSize: 1,
        rowToForm: (row: (typeof rows)[number]) => ({ name: row.name }),
        selectedRowIndex: rows.findIndex(row => row.id === activeRowId),
        setActiveRowId,
        setForm,
        setMode,
        setPage,
        sortedRows: rows,
        updateDrawerQuery
      })

      return { activeRowId, form, page, ...navigation }
    })

    act(() => result.current.goToNextRow())
    expect(result.current.activeRowId).toBe('first')
    expect(result.current.form.name).toBe('First')

    act(() => result.current.goToNextRow())
    expect(result.current.activeRowId).toBe('second')
    expect(result.current.page).toBe(2)
    expect(updateDrawerQuery).toHaveBeenLastCalledWith({
      id: 'second',
      mode: 'edit'
    })

    act(() => result.current.goToPreviousRow())
    expect(result.current.activeRowId).toBe('first')
    expect(result.current.page).toBe(1)
  })
})
