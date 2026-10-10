import { useState } from 'react'

import type { Selection } from '@vezham/react-v3'

import {
  type DrawerMode,
  useDisclosure
} from '@pages/academic/shared/entity-types'

type Options<Form> = {
  clearActiveRowOnClose: boolean
  clearSelectionOnClose: boolean
  initial: {
    activeRowId: string | null
    form: Form
    isOpen: boolean
    mode: DrawerMode
  }
}

export const useEntityDrawerState = <Form, Errors extends object>({
  clearActiveRowOnClose,
  clearSelectionOnClose,
  initial
}: Options<Form>) => {
  const [activeRowId, setActiveRowId] = useState(initial.activeRowId)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
  const [mode, setMode] = useState<DrawerMode>(initial.mode)
  const [form, setForm] = useState<Form>(initial.form)
  const [formErrors, setFormErrors] = useState<Errors>({} as Errors)
  const drawer = useDisclosure(() => {
    if (clearActiveRowOnClose) setActiveRowId(null)
    if (clearSelectionOnClose) setSelectedRowKeys(new Set())
  }, initial.isOpen)

  return {
    activeRowId,
    drawer,
    form,
    formErrors,
    mode,
    selectedRowKeys,
    setActiveRowId,
    setForm,
    setFormErrors,
    setMode,
    setSelectedRowKeys
  }
}
