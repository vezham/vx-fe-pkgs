import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useEntityTableRows } from '../src/pages/academic/shared/use-entity-table-rows'

const rows = [
  { id: 'a', score: 12 },
  { id: 'b', score: 3 },
  { id: 'c', score: 25 }
]

describe('academic table rows', () => {
  it('sorts numeric values, paginates, and preserves the selected row', () => {
    const { result } = renderHook(() =>
      useEntityTableRows({
        activeRowId: 'c',
        data: rows,
        filteredRows: rows,
        page: 2,
        rowsPerPage: '2',
        selectedRowKeys: new Set(['a', 'c']),
        sortDescriptor: { column: 'score', direction: 'ascending' }
      })
    )

    expect(result.current.sortedRows.map(row => row.id)).toEqual([
      'b',
      'a',
      'c'
    ])
    expect(result.current.paginatedRows.map(row => row.id)).toEqual(['c'])
    expect(result.current.selectedRows.map(row => row.id)).toEqual(['a', 'c'])
    expect(result.current.tableSelectedKeys).toEqual(new Set(['c']))
    expect(result.current.selectedRowIndex).toBe(2)
    expect(result.current.totalPages).toBe(2)
  })

  it('uses a page-specific sorter when supplied', () => {
    const { result } = renderHook(() =>
      useEntityTableRows({
        activeRowId: null,
        data: rows,
        filteredRows: rows,
        page: 1,
        rowsPerPage: '5',
        selectedRowKeys: 'all',
        sortDescriptor: { column: 'score', direction: 'descending' },
        sortRows: source => [...source].reverse()
      })
    )

    expect(result.current.sortedRows.map(row => row.id)).toEqual([
      'c',
      'b',
      'a'
    ])
    expect(result.current.selectedRows).toEqual(rows)
  })
})
