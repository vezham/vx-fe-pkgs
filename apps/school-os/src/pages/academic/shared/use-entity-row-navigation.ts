import { type Dispatch, type SetStateAction, useCallback } from 'react'

import type { DrawerMode } from '@pages/academic/shared/entity-types'

type Options<Row extends { id: string }, Form> = {
  mode: DrawerMode
  rowToForm: (row: Row) => Form
  selectedRowIndex: number
  sortedRows: Row[]
  setActiveRowId: Dispatch<SetStateAction<string | null>>
  setForm: Dispatch<SetStateAction<Form>>
  setMode: Dispatch<SetStateAction<DrawerMode>>
  updateDrawerQuery: (state: { id: string; mode: 'view' | 'edit' }) => void
  currentPage?: number
  pageSize?: number
  setPage?: Dispatch<SetStateAction<number>>
}

export const useEntityRowNavigation = <Row extends { id: string }, Form>({
  mode,
  rowToForm,
  selectedRowIndex,
  sortedRows,
  setActiveRowId,
  setForm,
  setMode,
  updateDrawerQuery,
  currentPage,
  pageSize,
  setPage
}: Options<Row, Form>) => {
  const goToRowAt = useCallback(
    (index: number) => {
      const nextRow = sortedRows[index]

      if (!nextRow) {
        return
      }

      if (currentPage !== undefined && pageSize && setPage) {
        const nextPage = Math.floor(index / pageSize) + 1

        if (nextPage !== currentPage) {
          setPage(nextPage)
        }
      }

      setActiveRowId(nextRow.id)
      setForm(rowToForm(nextRow))
      setMode(currentMode => (currentMode === 'create' ? 'view' : currentMode))
      updateDrawerQuery({
        id: nextRow.id,
        mode: mode === 'edit' ? 'edit' : 'view'
      })
    },
    [
      currentPage,
      mode,
      pageSize,
      rowToForm,
      setActiveRowId,
      setForm,
      setMode,
      setPage,
      sortedRows,
      updateDrawerQuery
    ]
  )

  const goToNextRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.min(sortedRows.length - 1, selectedRowIndex + 1))
  }, [goToRowAt, selectedRowIndex, sortedRows.length])

  const goToPreviousRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.max(0, selectedRowIndex - 1))
  }, [goToRowAt, selectedRowIndex])

  return { goToNextRow, goToPreviousRow }
}
