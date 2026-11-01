import { useMemo, useSyncExternalStore } from 'react'

import { getLocalStore } from './local-store'
import type { LocalStoreOptions } from './local-store'

// vx-bot/NOTE: A key identifies one schema. Keep its defaults and parser stable.
// Reads start at subscription time, after static/prerendered markup has mounted.
export const useLocalStore = <T>(
  key: string,
  initialValue: T,
  options: LocalStoreOptions<T> = {}
) => {
  const { parse, debounceMs } = options
  const store = useMemo(
    () => getLocalStore(key, initialValue, { parse, debounceMs }),
    [key, initialValue, parse, debounceMs]
  )
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getInitialSnapshot
  )
  return {
    ...snapshot,
    setValue: store.setValue,
    reset: store.reset,
    flush: store.flush
  }
}

export type { LocalStoreOptions } from './local-store'
