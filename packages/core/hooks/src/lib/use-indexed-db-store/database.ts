export const INDEXED_DB_NAME = 'vezham'
const RECORDS = 'records'

const openDatabase = (factory: IDBFactory | undefined): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (!factory) {
      reject(new Error('IndexedDB is unavailable in this browser.'))
      return
    }
    const request = factory.open(INDEXED_DB_NAME, 1)
    let blocked = false
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(RECORDS))
        request.result.createObjectStore(RECORDS)
    }
    request.onerror = () =>
      reject(request.error ?? new Error('Unable to open IndexedDB.'))
    request.onblocked = () => {
      blocked = true
      reject(new Error('IndexedDB is blocked by another open page.'))
    }
    request.onsuccess = () => {
      if (blocked) {
        request.result.close()
        return
      }
      request.result.onversionchange = () => request.result.close()
      resolve(request.result)
    }
  })

// vx-bot/NOTE: Read and update share one transaction, so simultaneous tabs cannot lose functional updates.
export const updateIndexedDBValue = async <T>(
  factory: IDBFactory | undefined,
  key: string,
  initialValue: T,
  parse?: (value: unknown) => T,
  update?: (current: T) => T
): Promise<T> => {
  const database = await openDatabase(factory)
  return new Promise((resolve, reject) => {
    let value: T
    let failure: unknown
    const transaction = database.transaction(RECORDS, 'readwrite')
    const records = transaction.objectStore(RECORDS)
    const request = records.get(key)
    request.onsuccess = () => {
      try {
        const stored: unknown = request.result
        const current =
          stored === undefined
            ? initialValue
            : parse
              ? parse(stored)
              : (stored as T)
        value = update ? update(current) : current
        if (update || stored === undefined) records.put(value, key)
      } catch (cause) {
        failure = cause
        transaction.abort()
      }
    }
    transaction.oncomplete = () => {
      database.close()
      resolve(value)
    }
    transaction.onabort = () => {
      database.close()
      reject(
        failure ??
          transaction.error ??
          new Error('IndexedDB transaction was aborted.')
      )
    }
    transaction.onerror = () => {
      failure ??= transaction.error
    }
  })
}
