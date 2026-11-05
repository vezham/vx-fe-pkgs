import { updateIndexedDBValue } from './database'

export interface IndexedDBStoreOptions<T> {
  parse?: (value: unknown) => T
  enabled?: boolean
}

interface Snapshot<T> {
  value: T
  isReady: boolean
  isSaved: boolean
  error: unknown
}

const createIndexedDBStore = <T>(
  key: string,
  initialValue: T,
  parse?: (value: unknown) => T
) => {
  const initial: Snapshot<T> = {
    value: initialValue,
    isReady: false,
    isSaved: true,
    error: null
  }
  let snapshot = initial
  let factory: IDBFactory | undefined
  let channel: BroadcastChannel | undefined
  let queue: Promise<unknown> = Promise.resolve()
  let revision = 0
  let pending = 0
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach(listener => listener())
  const fail = (error: unknown) => {
    snapshot = { ...snapshot, isReady: true, isSaved: false, error }
    emit()
  }
  const acceptRead = (value: T, version: number) => {
    if (revision !== version || pending) return
    snapshot = { value, isReady: true, isSaved: true, error: null }
    emit()
  }
  const read = async () => {
    const version = revision
    try {
      const value = await updateIndexedDBValue(
        factory,
        key,
        initialValue,
        parse
      )
      acceptRead(value, version)
    } catch (error) {
      if (revision === version) fail(error)
    }
  }
  const refresh = () => {
    queue = queue.then(read)
    return queue.then(() => undefined)
  }
  const setValue = (update: T | ((current: T) => T)): Promise<boolean> => {
    if (!snapshot.isReady || snapshot.error) return Promise.resolve(false)
    const apply = (current: T) =>
      typeof update === 'function'
        ? (update as (current: T) => T)(current)
        : update
    let optimistic: T
    try {
      optimistic = apply(snapshot.value)
    } catch (error) {
      fail(error)
      return Promise.resolve(false)
    }
    const version = ++revision
    pending++
    snapshot = { value: optimistic, isReady: true, isSaved: false, error: null }
    emit()
    const operation = queue.then(async () => {
      try {
        const value = await updateIndexedDBValue(
          factory,
          key,
          initialValue,
          parse,
          apply
        )
        pending--
        if (version === revision) {
          snapshot = {
            value,
            isReady: true,
            isSaved: pending === 0,
            error: null
          }
          emit()
        }
        channel?.postMessage(key)
        return true
      } catch (error) {
        pending--
        if (version === revision) fail(error)
        return false
      }
    })
    queue = operation.then(() => undefined)
    return operation
  }
  const store = {
    getSnapshot: () => snapshot,
    getInitialSnapshot: () => initial,
    setValue,
    refresh,
    flush: () => queue.then(() => undefined),
    subscribe: (listener: () => void) => {
      const first = listeners.size === 0
      listeners.add(listener)
      if (first) {
        stores.set(key, store as IndexedDBStore<unknown>)
        factory ??= globalThis.indexedDB
        if (!channel && typeof BroadcastChannel !== 'undefined') {
          channel = new BroadcastChannel('vezham:indexeddb')
          channel.onmessage = event => {
            if (event.data === key && listeners.size) void refresh()
          }
        }
        void refresh()
      }
      return () => {
        listeners.delete(listener)
        if (listeners.size) return
        if (stores.get(key) === store) stores.delete(key)
        // vx-bot/NOTE: Finish accepted writes even if the workspace or route unmounts.
        void queue.then(() => {
          if (!listeners.size) {
            channel?.close()
            channel = undefined
          }
        })
      }
    }
  }
  return store
}

type IndexedDBStore<T> = ReturnType<typeof createIndexedDBStore<T>>
const stores = new Map<string, IndexedDBStore<unknown>>()

export const getIndexedDBStore = <T>(
  key: string,
  initialValue: T,
  parse?: (value: unknown) => T
): IndexedDBStore<T> =>
  (stores.get(key) as IndexedDBStore<T> | undefined) ??
  createIndexedDBStore(key, initialValue, parse)
