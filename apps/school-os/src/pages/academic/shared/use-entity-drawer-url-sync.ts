import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useEffectEvent
} from 'react'

import type { Selection } from '@vezham/react-v3'

type DrawerMode = 'view' | 'edit' | 'create'

type DrawerPort = {
  onOpen: () => void
  onClose: () => void
}

type RouteStateOptions<Row extends { id: string }, Form> = {
  data: Row[]
  emptyForm: Form
  getRowIdFromPath: (pathname: string) => string | null
  pathname: string
  routeId: string | undefined
  rowToForm: (row: Row) => Form
  urlMode: unknown
}

export const getEntityDrawerRouteState = <Row extends { id: string }, Form>({
  data,
  emptyForm,
  getRowIdFromPath,
  pathname,
  routeId,
  rowToForm,
  urlMode
}: RouteStateOptions<Row, Form>) => {
  if (urlMode === 'create') {
    return {
      activeRowId: null,
      form: emptyForm,
      isOpen: true,
      mode: 'create' as DrawerMode
    }
  }

  const id = getRowIdFromPath(pathname) ?? routeId
  const row =
    id && (urlMode === 'view' || urlMode === 'edit')
      ? data.find(item => item.id === id)
      : undefined

  return {
    activeRowId: row?.id ?? null,
    form: row ? rowToForm(row) : emptyForm,
    isOpen: Boolean(row),
    mode: row ? (urlMode as 'view' | 'edit') : ('view' as DrawerMode)
  }
}

type Options<Row extends { id: string }, Form, Errors extends object> = {
  data: Row[]
  drawer: DrawerPort
  emptyErrors: Errors
  emptyForm: Form
  getRowIdFromPath: (pathname: string) => string | null
  routeId: string | undefined
  rowToForm: (row: Row) => Form
  setActiveRowId: Dispatch<SetStateAction<string | null>>
  setForm: Dispatch<SetStateAction<Form>>
  setFormErrors: Dispatch<SetStateAction<Errors>>
  setMode: Dispatch<SetStateAction<DrawerMode>>
  setSelectedRowKeys?: Dispatch<SetStateAction<Selection>>
}

export const useEntityDrawerUrlSync = <
  Row extends { id: string },
  Form,
  Errors extends object
>({
  data,
  drawer,
  emptyErrors,
  emptyForm,
  getRowIdFromPath,
  routeId,
  rowToForm,
  setActiveRowId,
  setForm,
  setFormErrors,
  setMode,
  setSelectedRowKeys
}: Options<Row, Form, Errors>) => {
  const syncDrawerFromUrl = useEffectEvent(() => {
    const next = getEntityDrawerRouteState({
      data,
      emptyForm,
      getRowIdFromPath,
      pathname: window.location.pathname,
      routeId,
      rowToForm,
      urlMode: new URLSearchParams(window.location.search).get('mode')
    })

    if (!next.isOpen) {
      setActiveRowId(null)
      setSelectedRowKeys?.(new Set())
      drawer.onClose()
      return
    }

    setMode(next.mode)
    setActiveRowId(next.activeRowId)
    setForm(next.form)
    setFormErrors(emptyErrors)
    drawer.onOpen()
  })

  useEffect(() => {
    const handlePopState = () => syncDrawerFromUrl()

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
}
