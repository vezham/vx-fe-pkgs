import { useHotkey } from '@tanstack/react-hotkeys'
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect
} from 'react'

import type { Selection } from '@vezham/react-v3'

import { useRowVisibility } from '@pages/_shared/use-row-visibility'

export const useRecordRowNavigation = (
  selectedRowIndex: number,
  rowCount: number,
  goToRowAt: (index: number) => void
) => {
  const goToNextRow = useCallback(() => {
    goToRowAt(
      selectedRowIndex < 0 ? 0 : Math.min(rowCount - 1, selectedRowIndex + 1)
    )
  }, [goToRowAt, rowCount, selectedRowIndex])

  const goToPreviousRow = useCallback(() => {
    goToRowAt(selectedRowIndex < 0 ? 0 : Math.max(0, selectedRowIndex - 1))
  }, [goToRowAt, selectedRowIndex])

  return { goToNextRow, goToPreviousRow }
}

export const useRecordDrawerToggle = <Row extends { id: string }>({
  isOpen,
  closeDrawer,
  selectedRowKeys,
  sortedRows,
  onSelected,
  onEmpty
}: {
  isOpen: boolean
  closeDrawer: () => void
  selectedRowKeys: Selection
  sortedRows: Row[]
  onSelected: (row: Row) => void
  onEmpty?: () => void
}) =>
  useCallback(() => {
    if (isOpen) {
      closeDrawer()
      return
    }

    const selectedKey = Array.from(selectedRowKeys)[0]
    const row =
      sortedRows.find(item => item.id === selectedKey) ?? sortedRows[0]
    if (row) {
      onSelected(row)
    } else {
      onEmpty?.()
    }
  }, [closeDrawer, isOpen, onEmpty, onSelected, selectedRowKeys, sortedRows])

export const useRecordTableInteractions = <
  Row extends { id: string },
  Toast
>(options: {
  activeRowId: string | null
  currentPage: number
  drawerOpen: boolean
  enableRowHotkeys: boolean
  goToNextRow: () => void
  goToPreviousRow: () => void
  pageSize: number
  rowAttribute: string
  rows: Row[]
  setPage: (page: number) => void
  setToast: Dispatch<SetStateAction<Toast | null>>
  toast: Toast | null
  toggleDrawer: () => void
}) => {
  const {
    activeRowId,
    currentPage,
    drawerOpen,
    enableRowHotkeys,
    goToNextRow,
    goToPreviousRow,
    pageSize,
    rowAttribute,
    rows,
    setPage,
    setToast,
    toast,
    toggleDrawer
  } = options

  useEffect(() => {
    if (!toast) return
    const timeoutId = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timeoutId)
  }, [setToast, toast])

  useRowVisibility({
    activeRowId,
    currentPage,
    pageSize,
    rows,
    setPage,
    rowAttribute
  })

  useHotkey('Meta+/', () => toggleDrawer())
  useHotkey('Meta+ArrowUp', () => goToPreviousRow(), {
    enabled: drawerOpen && enableRowHotkeys
  })
  useHotkey('Meta+ArrowDown', () => goToNextRow(), {
    enabled: drawerOpen && enableRowHotkeys
  })
}
