import { useCallback } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { Selection } from '@vezham/react-v3'

import { useRecordDrawerToggle } from '@pages/_shared/use-record-interactions'
import type {
  DrawerMode,
  DrawerState,
  OpenDrawerOptions
} from '@pages/academic/shared/entity-types'

type EntityRow = { id: string }
const emptyErrors = {}

type DrawerActionOptions<Row extends EntityRow, Form, Errors> = {
  clearSelectionOnClose: boolean
  drawer: DrawerState
  emptyForm: Form
  rowToForm: (row: Row) => Form
  selectedRow: Row | null
  selectedRowKeys: Selection
  sortedRows: Row[]
  setActiveRowId: Dispatch<SetStateAction<string | null>>
  setForm: Dispatch<SetStateAction<Form>>
  setFormErrors: Dispatch<SetStateAction<Errors>>
  setMode: Dispatch<SetStateAction<DrawerMode>>
  setSelectedRowKeys: Dispatch<SetStateAction<Selection>>
  updateDrawerQuery: (
    state: { id?: string; mode: DrawerMode } | null,
    replace?: boolean
  ) => void
}

export const useEntityDrawerActions = <Row extends EntityRow, Form, Errors>({
  clearSelectionOnClose,
  drawer,
  emptyForm,
  rowToForm,
  selectedRow,
  selectedRowKeys,
  sortedRows,
  setActiveRowId,
  setForm,
  setFormErrors,
  setMode,
  setSelectedRowKeys,
  updateDrawerQuery
}: DrawerActionOptions<Row, Form, Errors>) => {
  const openDrawer = useCallback(
    (
      nextMode: DrawerMode,
      row: Row | null,
      options: OpenDrawerOptions = {}
    ) => {
      setMode(nextMode)
      setActiveRowId(row?.id ?? null)
      setForm(row ? rowToForm(row) : emptyForm)
      setFormErrors(emptyErrors as Errors)
      drawer.onOpen()

      if (options.syncUrl !== false) {
        updateDrawerQuery(
          nextMode === 'create'
            ? { mode: nextMode }
            : row
              ? { id: row.id, mode: nextMode }
              : null,
          options.replaceUrl
        )
      }
    },
    [
      drawer,
      emptyForm,
      rowToForm,
      setActiveRowId,
      setForm,
      setFormErrors,
      setMode,
      updateDrawerQuery
    ]
  )

  const closeDrawer = useCallback(() => {
    setFormErrors(emptyErrors as Errors)
    drawer.onClose()
    setActiveRowId(null)
    if (clearSelectionOnClose) setSelectedRowKeys(new Set())
    updateDrawerQuery(null)
  }, [
    clearSelectionOnClose,
    drawer,
    setActiveRowId,
    setFormErrors,
    setSelectedRowKeys,
    updateDrawerQuery
  ])

  const toggleDrawer = useRecordDrawerToggle({
    isOpen: drawer.isOpen,
    closeDrawer,
    selectedRowKeys,
    sortedRows,
    onSelected: row => openDrawer('view', row, { replaceUrl: true }),
    onEmpty: () => openDrawer('create', null)
  })

  const setDrawerMode = useCallback(
    (nextMode: Exclude<DrawerMode, 'create'>) => {
      setMode(nextMode)
      if (selectedRow) updateDrawerQuery({ id: selectedRow.id, mode: nextMode })
    },
    [selectedRow, setMode, updateDrawerQuery]
  )

  return { closeDrawer, openDrawer, setDrawerMode, toggleDrawer }
}
