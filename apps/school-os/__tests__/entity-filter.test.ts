import { describe, expect, it } from 'vitest'

import { filterEntityRows } from '../src/pages/academic/shared/entity-filter'

const rows = [
  {
    id: '1',
    createdAt: '2026-01-10',
    name: 'Algebra',
    status: 'active',
    createdBy: 'Mia'
  },
  {
    id: '2',
    createdAt: '2026-02-10',
    name: 'Biology',
    status: 'inactive',
    createdBy: 'Noah'
  }
]

describe('academic entity filtering', () => {
  it('combines search, date range, and active field filters', () => {
    expect(
      filterEntityRows({
        data: rows,
        dateRange: { start: '2026-01-01', end: '2026-01-31' },
        filters: { status: 'active' },
        filterKeys: ['status'],
        searchKeys: ['name'],
        searchQuery: 'ALG'
      }).map(row => row.id)
    ).toEqual(['1'])
  })

  it('supports page specific search values and comparisons', () => {
    expect(
      filterEntityRows({
        data: rows,
        dateRange: null,
        filters: { name: ' Algebra ' },
        filterKeys: ['name'],
        searchKeys: ['name'],
        searchQuery: 'mia',
        extraSearchValues: row => [row.createdBy],
        matchesFilter: (_key, rowValue, filterValue) =>
          rowValue.trim() === filterValue.trim()
      }).map(row => row.id)
    ).toEqual(['1'])
  })
})
