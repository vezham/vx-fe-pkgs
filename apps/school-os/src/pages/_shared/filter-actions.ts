import type { Dispatch, SetStateAction } from 'react'

export const createFilterActions = <Filters>({
  draftFilters,
  emptyFilters,
  setDraftFilters,
  setFilters,
  setPage
}: {
  draftFilters: Filters
  emptyFilters: Filters
  setDraftFilters: Dispatch<SetStateAction<Filters>>
  setFilters: Dispatch<SetStateAction<Filters>>
  setPage: Dispatch<SetStateAction<number>>
}) => ({
  applyFilters: () => {
    setFilters(draftFilters)
    setPage(1)
  },
  resetFilters: () => {
    setDraftFilters(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }
})
