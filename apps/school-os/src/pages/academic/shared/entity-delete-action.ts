import type { Dispatch, SetStateAction } from 'react'

import type { Selection } from '@vezham/react-v3'

import type { DrawerState } from '@pages/academic/shared/entity-types'

type EntityRow = { id: string }

type Options<Row extends EntityRow> = {
  activeRowId: string | null
  drawer: DrawerState
  removeFromSelection: boolean
  setActiveRowId: Dispatch<SetStateAction<string | null>>
  setData: Dispatch<SetStateAction<Row[]>>
  setSelectedRowKeys: Dispatch<SetStateAction<Selection>>
  showToast: (message: string) => void
  updateDrawerQuery: (state: null) => void
}

export const createEntityDeleteAction =
  <Row extends EntityRow>({
    activeRowId,
    drawer,
    removeFromSelection,
    setActiveRowId,
    setData,
    setSelectedRowKeys,
    showToast,
    updateDrawerQuery
  }: Options<Row>) =>
  (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))

    if (removeFromSelection) {
      setSelectedRowKeys(current => {
        if (current === 'all') return new Set()
        if (!current.size) return current

        const next = new Set(current)
        next.delete(rowId)
        return next
      })
    }

    if (activeRowId === rowId) {
      setActiveRowId(null)
      drawer.onClose()
      updateDrawerQuery(null)
    }

    showToast('Item deleted')
  }
