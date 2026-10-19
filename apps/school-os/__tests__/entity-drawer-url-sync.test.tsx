import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { createEntityRoute } from '../src/pages/academic/shared/entity-route'
import { useDisclosure } from '../src/pages/academic/shared/entity-types'
import {
  getEntityDrawerRouteState,
  useEntityDrawerUrlSync
} from '../src/pages/academic/shared/use-entity-drawer-url-sync'

const route = createEntityRoute('/academic/section')
const rows = [{ id: 'row/1', name: 'Ada' }]
const rowToForm = (row: (typeof rows)[number]) => ({ name: row.name })
const basePath = '/school/academic/section'

describe('academic drawer URL state', () => {
  it('initializes a direct row link from the route location', () => {
    expect(
      getEntityDrawerRouteState({
        data: rows,
        emptyForm: { name: '' },
        getRowIdFromPath: route.getRowIdFromPath,
        pathname: `${basePath}/row%2F1`,
        routeId: 'row/1',
        rowToForm,
        urlMode: 'edit'
      })
    ).toEqual({
      activeRowId: 'row/1',
      form: { name: 'Ada' },
      isOpen: true,
      mode: 'edit'
    })
  })

  it('keeps an unknown row closed and supports a create link', () => {
    const options = {
      data: rows,
      emptyForm: { name: '' },
      getRowIdFromPath: route.getRowIdFromPath,
      pathname: `${basePath}/missing`,
      routeId: undefined,
      rowToForm
    }

    expect(getEntityDrawerRouteState({ ...options, urlMode: 'view' })).toEqual({
      activeRowId: null,
      form: { name: '' },
      isOpen: false,
      mode: 'view'
    })
    expect(
      getEntityDrawerRouteState({ ...options, urlMode: 'create' })
    ).toEqual({
      activeRowId: null,
      form: { name: '' },
      isOpen: true,
      mode: 'create'
    })
  })

  it('syncs browser Back and Forward without resetting state on mount', () => {
    const originalUrl = window.location.href
    window.history.replaceState(null, '', basePath)
    const drawer = { onOpen: vi.fn(), onClose: vi.fn() }
    const setActiveRowId = vi.fn()
    const setForm = vi.fn()
    const setFormErrors = vi.fn()
    const setMode = vi.fn()
    const setSelectedRowKeys = vi.fn()

    try {
      renderHook(() =>
        useEntityDrawerUrlSync({
          data: rows,
          drawer,
          emptyErrors: {},
          emptyForm: { name: '' },
          getRowIdFromPath: route.getRowIdFromPath,
          routeId: undefined,
          rowToForm,
          setActiveRowId,
          setForm,
          setFormErrors,
          setMode,
          setSelectedRowKeys
        })
      )
      expect(drawer.onClose).not.toHaveBeenCalled()

      act(() => {
        window.history.replaceState(null, '', `${basePath}/row%2F1?mode=view`)
        window.dispatchEvent(new PopStateEvent('popstate'))
      })
      expect(drawer.onOpen).toHaveBeenCalledOnce()
      expect(setActiveRowId).toHaveBeenLastCalledWith('row/1')
      expect(setForm).toHaveBeenLastCalledWith({ name: 'Ada' })

      act(() => {
        window.history.replaceState(null, '', basePath)
        window.dispatchEvent(new PopStateEvent('popstate'))
      })
      expect(drawer.onClose).toHaveBeenCalledOnce()
      expect(setActiveRowId).toHaveBeenLastCalledWith(null)
      expect(setSelectedRowKeys).toHaveBeenCalledOnce()
    } finally {
      window.history.replaceState(null, '', originalUrl)
    }
  })

  it('clears close state when the overlay dismisses', () => {
    const onClose = vi.fn()
    const { result } = renderHook(() => useDisclosure(onClose, true))

    act(() => result.current.onOpenChange(false))

    expect(result.current.isOpen).toBe(false)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
