import { act, renderHook, waitFor } from '@testing-library/react'
import { IDBObjectStore } from 'fake-indexeddb'
import { renderToString } from 'react-dom/server'
import { expect, it, vi } from 'vitest'

import { updateIndexedDBValue } from './database'
import { useIndexedDBStore } from './index'

it('updates immediately, saves asynchronously, and restores structured data after remount', async () => {
  const first = renderHook(() => useIndexedDBStore('notes', ''))
  await waitFor(() => expect(first.result.current.isReady).toBe(true))
  let commit: Promise<boolean>
  act(() => {
    commit = first.result.current.setValue('x'.repeat(100_000))
  })
  expect(first.result.current.value).toHaveLength(100_000)
  expect(first.result.current.isSaved).toBe(false)
  await act(async () => {
    expect(await commit).toBe(true)
  })
  expect(first.result.current.isSaved).toBe(true)
  first.unmount()
  const second = renderHook(() => useIndexedDBStore('notes', ''))
  await waitFor(() => expect(second.result.current.value).toHaveLength(100_000))
  expect(localStorage.getItem('notes')).toBeNull()
})

it('serializes concurrent functional updates in database transactions', async () => {
  await Promise.all(
    Array.from({ length: 12 }, () =>
      updateIndexedDBValue(
        indexedDB,
        'counter',
        0,
        undefined,
        value => value + 1
      )
    )
  )
  expect(await updateIndexedDBValue(indexedDB, 'counter', 0)).toBe(12)
})

it('preserves structured records rather than serializing them as JSON', async () => {
  const date = new Date('2026-01-01T00:00:00Z')
  await updateIndexedDBValue(indexedDB, 'record', {
    date,
    bytes: new Uint8Array([1, 2, 3])
  })
  const stored = await updateIndexedDBValue(indexedDB, 'record', {
    date: new Date(0),
    bytes: new Uint8Array()
  })
  expect(stored.date).toEqual(date)
  expect(Array.from(stored.bytes)).toEqual([1, 2, 3])
})

it('reports write failures and leaves the last durable value intact', async () => {
  const hook = renderHook(() => useIndexedDBStore('failure', 'saved'))
  await waitFor(() => expect(hook.result.current.isReady).toBe(true))
  const put = vi
    .spyOn(IDBObjectStore.prototype, 'put')
    .mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })
  await act(async () => {
    expect(await hook.result.current.setValue('unsaved')).toBe(false)
  })
  expect(hook.result.current.error).toBeTruthy()
  expect(hook.result.current.isSaved).toBe(false)
  put.mockRestore()
  expect(await updateIndexedDBValue(indexedDB, 'failure', '')).toBe('saved')
})

it('does not access storage while disabled and reports unavailable IndexedDB', async () => {
  vi.stubGlobal('indexedDB', undefined)
  const disabled = renderHook(() =>
    useIndexedDBStore('disabled', '', { enabled: false })
  )
  expect(disabled.result.current.isReady).toBe(false)
  const enabled = renderHook(() => useIndexedDBStore('enabled', ''))
  await waitFor(() => expect(enabled.result.current.error).toBeTruthy())
  expect(localStorage.getItem('enabled')).toBeNull()
})

it('renders static markup without opening browser storage', () => {
  const open = vi.spyOn(indexedDB, 'open')
  const Probe = () => {
    const store = useIndexedDBStore('prerender', 'Static default')
    return <span>{store.value}</span>
  }
  expect(renderToString(<Probe />)).toContain('Static default')
  expect(open).not.toHaveBeenCalled()
  open.mockRestore()
})

it('preserves invalid saved records when schema validation fails', async () => {
  await updateIndexedDBValue(indexedDB, 'corrupt', { invalid: true })
  const parse = () => {
    throw new Error('Invalid catalog')
  }
  const hook = renderHook(() =>
    useIndexedDBStore<string>('corrupt', '', { parse })
  )
  await waitFor(() => expect(hook.result.current.error).toBeTruthy())
  expect(await hook.result.current.setValue('overwrite')).toBe(false)
  expect(await updateIndexedDBValue(indexedDB, 'corrupt', {})).toEqual({
    invalid: true
  })
})
