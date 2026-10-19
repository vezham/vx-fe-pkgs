import { useMemo } from 'react'

import type { Selection } from '@vezham/react-v3'

export const useTableRowView = <Row extends { id: string }>(options: {
  activeRowId: string | null
  data: Row[]
  page: number
  rowsPerPage: string
  selectedRowKeys: Selection
  sortedRows: Row[]
}) => {
  const { activeRowId, data, page, rowsPerPage, selectedRowKeys, sortedRows } =
    options
  const pageSize = Number(rowsPerPage)
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedRow = useMemo(
    () => data.find(row => row.id === activeRowId) ?? null,
    [activeRowId, data]
  )
  const selectedRowIndex = activeRowId
    ? sortedRows.findIndex(row => row.id === activeRowId)
    : -1
  const tableSelectedKeys = useMemo(
    () => (activeRowId ? new Set([activeRowId]) : selectedRowKeys),
    [activeRowId, selectedRowKeys]
  )

  return {
    currentPage,
    pageSize,
    paginatedRows,
    selectedRow,
    selectedRowIndex,
    tableSelectedKeys,
    totalPages
  }
}
