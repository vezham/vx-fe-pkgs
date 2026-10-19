import { useMemo } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import { useTableRowView } from '@pages/_shared/use-table-row-view'

type EntityRow = { id: string }

type TableRowsOptions<Row extends EntityRow> = {
  activeRowId: string | null
  data: Row[]
  filteredRows: Row[]
  page: number
  rowsPerPage: string
  selectedRowKeys: Selection
  sortDescriptor: SortDescriptor
  sortRows?: (rows: Row[], descriptor: SortDescriptor) => Row[]
  getSortableValue?: (row: Row, column: SortDescriptor['column']) => unknown
}

const compareValues = (first: unknown, second: unknown) =>
  typeof first === 'number' && typeof second === 'number'
    ? first - second
    : String(first).localeCompare(String(second), undefined, { numeric: true })

export const useEntityTableRows = <Row extends EntityRow>({
  activeRowId,
  data,
  filteredRows,
  page,
  rowsPerPage,
  selectedRowKeys,
  sortDescriptor,
  sortRows,
  getSortableValue
}: TableRowsOptions<Row>) => {
  const sortedRows = useMemo(() => {
    if (sortRows) return sortRows(filteredRows, sortDescriptor)

    return [...filteredRows].sort((firstRow, secondRow) => {
      const column = sortDescriptor.column
      const first = getSortableValue
        ? getSortableValue(firstRow, column)
        : firstRow[column as keyof Row]
      const second = getSortableValue
        ? getSortableValue(secondRow, column)
        : secondRow[column as keyof Row]
      const comparison = compareValues(first, second)

      return sortDescriptor.direction === 'descending'
        ? comparison * -1
        : comparison
    })
  }, [filteredRows, getSortableValue, sortDescriptor, sortRows])

  const rowView = useTableRowView({
    activeRowId,
    data,
    page,
    rowsPerPage,
    selectedRowKeys,
    sortedRows
  })
  const selectedRows = useMemo(() => {
    if (selectedRowKeys === 'all') return data
    return data.filter(row => selectedRowKeys.has(row.id))
  }, [data, selectedRowKeys])

  return {
    ...rowView,
    selectedRows,
    sortedRows
  }
}
