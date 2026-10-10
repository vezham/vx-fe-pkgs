import type { SortDescriptor } from '@vezham/react-v3'

export type SortFieldOption = {
  key: string
  label: string
  column: string
}

type SortOrderOption = {
  key: string
  label: string
  direction: SortDescriptor['direction']
  icon: string
}

export const sortOrderOptions = [
  {
    key: 'ascending',
    label: 'Ascending',
    direction: 'ascending',
    icon: 'vx:sort-ascending'
  },
  {
    key: 'descending',
    label: 'Descending',
    direction: 'descending',
    icon: 'vx:sort-descending'
  }
] as const satisfies readonly SortOrderOption[]
export const sortRows = <T extends Record<string, unknown>>(
  rows: T[],
  sortDescriptor: SortDescriptor
) => {
  return [...rows].sort((firstRow, secondRow) => {
    const first = firstRow[sortDescriptor.column as keyof T]
    const second = secondRow[sortDescriptor.column as keyof T]
    const comparison =
      typeof first === 'number' && typeof second === 'number'
        ? first - second
        : String(first).localeCompare(String(second), undefined, {
            numeric: true
          })

    return sortDescriptor.direction === 'descending'
      ? comparison * -1
      : comparison
  })
}
