import { useCallback } from 'react'

import { copyToClipboard } from '@pages/_shared/clipboard'
import type { DrawerMode } from '@pages/academic/shared/entity-types'

type Row = { id: string }
type ShowToast = (message: string, status?: 'success' | 'danger') => void

type Options<RowValue extends Row> = {
  getRowUrl: (row: RowValue, mode?: 'view' | 'edit') => string
  mode: DrawerMode
  selectedRows: RowValue[]
  showToast: ShowToast
}

export const useEntityCopyActions = <RowValue extends Row>({
  getRowUrl,
  mode,
  selectedRows,
  showToast
}: Options<RowValue>) => {
  const copyWithToast = useCallback(
    (value: string, success: string, failure: string) => {
      void copyToClipboard(value)
        .then(() => showToast(success))
        .catch(() => showToast(failure, 'danger'))
    },
    [showToast]
  )

  const copyClassLink = useCallback(
    (row: RowValue) => {
      copyWithToast(
        getRowUrl(row, mode === 'edit' ? 'edit' : 'view'),
        'URL copied',
        'Unable to copy URL'
      )
    },
    [copyWithToast, getRowUrl, mode]
  )

  const copyClassId = useCallback(
    (row: RowValue) => {
      copyWithToast(row.id, 'ID copied', 'Unable to copy ID')
    },
    [copyWithToast]
  )

  const openClassPage = useCallback(
    (row: RowValue) => {
      window.open(getRowUrl(row), '_blank', 'noopener,noreferrer')
    },
    [getRowUrl]
  )

  const copySelectedIds = useCallback(() => {
    if (!selectedRows.length) return

    copyWithToast(
      selectedRows.map(row => row.id).join('\n'),
      selectedRows.length === 1
        ? 'ID copied'
        : `${selectedRows.length} IDs copied`,
      'Unable to copy IDs'
    )
  }, [copyWithToast, selectedRows])

  const copySelectedLinks = useCallback(() => {
    if (!selectedRows.length) return

    copyWithToast(
      selectedRows
        .map(row => getRowUrl(row, mode === 'edit' ? 'edit' : 'view'))
        .join('\n'),
      selectedRows.length === 1
        ? 'URL copied'
        : `${selectedRows.length} URLs copied`,
      'Unable to copy URLs'
    )
  }, [copyWithToast, getRowUrl, mode, selectedRows])

  return {
    copyClassId,
    copyClassLink,
    copySelectedIds,
    copySelectedLinks,
    openClassPage
  }
}
