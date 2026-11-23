import type { RowSelectionState, SortingState } from '@tanstack/react-table'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

export const getHeroUISortDescriptor = (
  sorting: SortingState
): SortDescriptor | undefined => {
  const primary = sorting[0]
  return primary
    ? {
        column: primary.id,
        direction: primary.desc ? 'descending' : 'ascending'
      }
    : undefined
}

export const getTanStackSorting = (
  descriptor: SortDescriptor,
  sorting: SortingState = []
): SortingState => {
  const id = String(descriptor.column)
  return [
    {
      desc: descriptor.direction === 'descending',
      id
    },
    ...sorting.filter(sort => sort.id !== id)
  ]
}

export const getHeroUISelection = (
  rowSelection: RowSelectionState
): Set<string> => {
  return new Set(
    Object.entries(rowSelection).flatMap(([id, selected]) =>
      selected ? [id] : []
    )
  )
}

export const getTanStackRowSelection = (
  selection: Selection,
  rowIds: readonly string[]
): RowSelectionState => {
  const selectedIds =
    selection === 'all'
      ? new Set(rowIds)
      : new Set(Array.from(selection, key => String(key)))

  return Object.fromEntries(
    rowIds.flatMap(id => (selectedIds.has(id) ? [[id, true]] : []))
  )
}
