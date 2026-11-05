import { useMemo, useSyncExternalStore } from 'react'

import { getIndexedDBStore } from './indexed-db-store'
import type { IndexedDBStoreOptions } from './indexed-db-store'

const disabledSubscribe = () => () => undefined

export const useIndexedDBStore = <T>(
  key: string,
  initialValue: T,
  options: IndexedDBStoreOptions<T> = {}
) => {
  const { parse, enabled = true } = options
  const store = useMemo(
    () => getIndexedDBStore(key, initialValue, parse),
    [key, initialValue, parse]
  )
  const snapshot = useSyncExternalStore(
    enabled ? store.subscribe : disabledSubscribe,
    enabled ? store.getSnapshot : store.getInitialSnapshot,
    store.getInitialSnapshot
  )
  return {
    ...snapshot,
    setValue: store.setValue,
    flush: store.flush,
    refresh: store.refresh
  }
}

export type { IndexedDBStoreOptions } from './indexed-db-store'

export type { IndexedDBMutationOptions } from './database'
