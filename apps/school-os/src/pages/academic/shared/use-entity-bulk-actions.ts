import { useCallback } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { Selection } from '@vezham/react-v3'

import type { OpenDrawerOptions } from '@pages/academic/shared/entity-types'

type EntityRow = { id: string }

type Options<Row extends EntityRow> = {
  activeRowId: string | null
  closeDrawer: () => void
  openDrawer: (
    mode: 'view' | 'edit' | 'create',
    row: Row | null,
    options?: OpenDrawerOptions
  ) => void
  selectedRows: Row[]
  setData: Dispatch<SetStateAction<Row[]>>
  setSelectedRowKeys: Dispatch<SetStateAction<Selection>>
  showToast: (message: string) => void
}

export const useEntityBulkActions = <Row extends EntityRow>({
  activeRowId,
  closeDrawer,
  openDrawer,
  selectedRows,
  setData,
  setSelectedRowKeys,
  showToast
}: Options<Row>) => {
  const editSelected = useCallback(() => {
    if (selectedRows.length === 1) openDrawer('edit', selectedRows[0])
  }, [openDrawer, selectedRows])

  const deleteSelected = useCallback(() => {
    if (!selectedRows.length) return

    const selectedIds = new Set(selectedRows.map(row => row.id))
    setData(current => current.filter(row => !selectedIds.has(row.id)))
    setSelectedRowKeys(new Set())

    if (activeRowId && selectedIds.has(activeRowId)) closeDrawer()

    showToast(
      selectedRows.length === 1
        ? 'Item deleted'
        : `${selectedRows.length} items deleted`
    )
  }, [
    activeRowId,
    closeDrawer,
    selectedRows,
    setData,
    setSelectedRowKeys,
    showToast
  ])

  return { editSelected, deleteSelected }
}
