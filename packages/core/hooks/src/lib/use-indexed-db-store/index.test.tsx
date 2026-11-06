import { act, renderHook, waitFor } from '@testing-library/react'
import { IDBObjectStore } from 'fake-indexeddb'
import { renderToString } from 'react-dom/server'
import { expect, it, vi } from 'vitest'

import { readIndexedDBValue, updateIndexedDBValue } from './database'
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
  expect(hook.result.current.isLoaded).toBe(true)
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
  expect(hook.result.current.isLoaded).toBe(false)
  expect(await hook.result.current.setValue('overwrite')).toBe(false)
  expect(await updateIndexedDBValue(indexedDB, 'corrupt', {})).toEqual({
    invalid: true
  })
})

it('atomically deletes scoped records and blocks stale writes from resurrecting them', async () => {
  const prefix = 'app:workspace:removed:'
  await updateIndexedDBValue(indexedDB, prefix + 'notes', 'private notes')
  await updateIndexedDBValue(indexedDB, prefix + 'chat', ['private chat'])
  await updateIndexedDBValue(indexedDB, 'app:workspace:kept:notes', 'keep me')
  await updateIndexedDBValue(
    indexedDB,
    'catalog',
    ['removed', 'kept'],
    undefined,
    () => ['kept'],
    { deletePrefixes: [prefix] }
  )
  expect(await updateIndexedDBValue(indexedDB, 'catalog', [])).toEqual(['kept'])
  expect(
    await updateIndexedDBValue(indexedDB, 'app:workspace:kept:notes', '')
  ).toBe('keep me')
  await expect(
    updateIndexedDBValue(
      indexedDB,
      prefix + 'notes',
      '',
      undefined,
      () => 'stale write'
    )
  ).rejects.toThrow('deleted')
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('vezham', 1)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
  const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
    const request = db
      .transaction('records', 'readonly')
      .objectStore('records')
      .getAllKeys()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
  db.close()
  expect(keys.some(key => String(key).startsWith(prefix))).toBe(false)
})

it('rolls back both the catalog and deletion when a database transaction fails', async () => {
  await updateIndexedDBValue(indexedDB, 'rollback-catalog', ['one', 'two'])
  await updateIndexedDBValue(indexedDB, 'rollback-scope:notes', 'keep me')
  await expect(
    updateIndexedDBValue(
      indexedDB,
      'rollback-catalog',
      [],
      undefined,
      () => {
        throw new Error('Keep at least one workspace.')
      },
      { deletePrefixes: ['rollback-scope:'] }
    )
  ).rejects.toThrow('Keep at least one')
  expect(await updateIndexedDBValue(indexedDB, 'rollback-catalog', [])).toEqual(
    ['one', 'two']
  )
  expect(
    await updateIndexedDBValue(indexedDB, 'rollback-scope:notes', '')
  ).toBe('keep me')
})

it('commits file bytes and metadata together and rolls both back on batch failures', async () => {
  await updateIndexedDBValue(indexedDB, 'atomic:root', { count: 0 })
  await updateIndexedDBValue(
    indexedDB,
    'atomic:root',
    { count: 0 },
    undefined,
    () => ({ count: 1 }),
    { putRecords: { 'atomic:file': new Uint8Array([1, 2, 3]) } }
  )
  expect(
    Array.from((await readIndexedDBValue<Uint8Array>('atomic:file')) ?? [])
  ).toEqual([1, 2, 3])
  await expect(
    updateIndexedDBValue(
      indexedDB,
      'atomic:root',
      { count: 0 },
      undefined,
      () => ({ count: 2 }),
      { putRecords: { 'atomic:second': 'bytes', 'atomic:root': 'invalid' } }
    )
  ).rejects.toThrow('Invalid batch')
  expect(await readIndexedDBValue('atomic:root')).toEqual({ count: 1 })
  expect(await readIndexedDBValue('atomic:second')).toBeUndefined()
  await updateIndexedDBValue(
    indexedDB,
    'atomic:root',
    { count: 0 },
    undefined,
    () => ({ count: 0 }),
    { deleteKeys: ['atomic:file'] }
  )
  expect(await readIndexedDBValue('atomic:file')).toBeUndefined()
})
