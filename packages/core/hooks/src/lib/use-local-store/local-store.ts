export interface LocalStoreOptions<T> {
  parse?: (value: unknown) => T
  debounceMs?: number
}

interface Snapshot<T> {
  value: T
  isReady: boolean
  isSaved: boolean
  error: unknown
}

const createLocalStore = <T>(
  key: string,
  initialValue: T,
  { parse, debounceMs = 0 }: LocalStoreOptions<T>
) => {
  const initial: Snapshot<T> = {
    value: initialValue,
    isReady: false,
    isSaved: true,
    error: null
  }
  let snapshot = initial
  let dirty = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach(listener => listener())
  const cancel = () => {
    clearTimeout(timer)
    timer = undefined
  }
  const flush = () => {
    cancel()
    if (!dirty || typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(snapshot.value))
      dirty = false
      snapshot = { ...snapshot, isSaved: true, error: null }
    } catch (error) {
      snapshot = { ...snapshot, isSaved: false, error }
    }
    emit()
  }
  const read = () => {
    try {
      const raw = window.localStorage.getItem(key)
      const decoded: unknown = raw === null ? initialValue : JSON.parse(raw)
      const value =
        raw === null ? initialValue : parse ? parse(decoded) : (decoded as T)
      snapshot = { value, isReady: true, isSaved: true, error: null }
      if (raw !== null && parse && JSON.stringify(value) !== raw) {
        dirty = true
        flush()
      }
    } catch (error) {
      snapshot = { value: initialValue, isReady: true, isSaved: false, error }
    }
    emit()
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== key) return
    if (event.storageArea && event.storageArea !== window.localStorage) return
    cancel()
    dirty = false
    read()
  }
  const setValue = (update: T | ((current: T) => T)) => {
    if (typeof window === 'undefined') return
    if (!snapshot.isReady) read()
    const value =
      typeof update === 'function'
        ? (update as (current: T) => T)(snapshot.value)
        : update
    snapshot = { value, isReady: true, isSaved: false, error: null }
    dirty = true
    emit()
    cancel()
    if (debounceMs > 0) timer = setTimeout(flush, debounceMs)
    else flush()
  }
  const reset = () => {
    cancel()
    dirty = false
    snapshot = {
      value: initialValue,
      isReady: true,
      isSaved: true,
      error: null
    }
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      snapshot = { ...snapshot, isSaved: false, error }
    }
    emit()
  }
  const store = {
    getSnapshot: () => snapshot,
    getInitialSnapshot: () => initial,
    setValue,
    reset,
    flush,
    subscribe: (listener: () => void) => {
      const first = listeners.size === 0
      listeners.add(listener)
      if (first) {
        stores.set(key, store as LocalStore<unknown>)
        if (!dirty) read()
        window.addEventListener('storage', onStorage)
        window.addEventListener('pagehide', flush)
      }
      return () => {
        listeners.delete(listener)
        if (listeners.size) return
        flush()
        window.removeEventListener('storage', onStorage)
        window.removeEventListener('pagehide', flush)
        if (stores.get(key) === store) stores.delete(key)
      }
    }
  }
  return store
}

type LocalStore<T> = ReturnType<typeof createLocalStore<T>>
const stores = new Map<string, LocalStore<unknown>>()

export const getLocalStore = <T>(
  key: string,
  initialValue: T,
  options: LocalStoreOptions<T>
) => {
  const existing = stores.get(key)
  if (existing) return existing as LocalStore<T>
  const store = createLocalStore(key, initialValue, options)
  stores.set(key, store as LocalStore<unknown>)
  return store
}
