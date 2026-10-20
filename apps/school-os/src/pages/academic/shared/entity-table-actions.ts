import type { Dispatch, SetStateAction } from 'react'

import type { SortDescriptor } from '@vezham/react-v3'

import { createFilterActions } from '@pages/_shared/filter-actions'

type TableActionOptions<Filters> = {
  draftFilters: Filters
  emptyFilters: Filters
  getSortLabel: (column: SortDescriptor['column']) => string
  setActiveSortLabel: Dispatch<SetStateAction<string>>
  setDraftFilters: Dispatch<SetStateAction<Filters>>
  setFilters: Dispatch<SetStateAction<Filters>>
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<string>>
  setSearchQuery: Dispatch<SetStateAction<string>>
  setSortDirection: Dispatch<SetStateAction<SortDescriptor['direction']>>
  setSortField: Dispatch<SetStateAction<SortDescriptor['column']>>
}

export const createEntityTableActions = <Filters>({
  draftFilters,
  emptyFilters,
  getSortLabel,
  setActiveSortLabel,
  setDraftFilters,
  setFilters,
  setPage,
  setRowsPerPage,
  setSearchQuery,
  setSortDirection,
  setSortField
}: TableActionOptions<Filters>) => {
  const updateSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const updateRowsPerPage = (value: string | number | null) => {
    setRowsPerPage(value ? String(value) : '10')
    setPage(1)
  }

  const { applyFilters, resetFilters } = createFilterActions({
    draftFilters,
    emptyFilters,
    setDraftFilters,
    setFilters,
    setPage
  })

  const updateSortField = (column: SortDescriptor['column']) => {
    setSortField(column)
    setActiveSortLabel(getSortLabel(column))
    setPage(1)
  }

  const updateSortDirection = (direction: SortDescriptor['direction']) => {
    setSortDirection(direction)
    setPage(1)
  }

  const updateSortChange = (descriptor: SortDescriptor) => {
    setSortField(descriptor.column)
    setSortDirection(descriptor.direction)
    setActiveSortLabel(getSortLabel(descriptor.column))
    setPage(1)
  }

  return {
    applyFilters,
    resetFilters,
    updateRowsPerPage,
    updateSearch,
    updateSortChange,
    updateSortDirection,
    updateSortField
  }
}
