const INDEXED_DB_NAME = 'vezham'
const RECORDS = 'records'
const DELETED_PREFIXES = '\0deleted-prefixes'

export interface IndexedDBMutationOptions {
  putRecords?: Readonly<Record<string, unknown>>
  deleteKeys?: readonly string[]
  optimistic?: boolean
  deletePrefixes?: readonly string[]
}

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
  update?: (current: T) => T,
  options: IndexedDBMutationOptions = {}
): Promise<T> => {
  const database = await openDatabase(factory)
  return new Promise((resolve, reject) => {
    let value: T
    let failure: unknown
    const transaction = database.transaction(RECORDS, 'readwrite')
    const records = transaction.objectStore(RECORDS)
    const deletedRequest = records.get(DELETED_PREFIXES)
    deletedRequest.onsuccess = () => {
      const deleted: string[] = deletedRequest.result ?? []
      if (deleted.some(prefix => key.startsWith(prefix))) {
        failure = new Error('This data scope has been deleted.')
        transaction.abort()
        return
      }
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
          for (const [recordKey, recordValue] of Object.entries(
            options.putRecords ?? {}
          )) {
            if (
              recordKey === key ||
              recordKey === DELETED_PREFIXES ||
              deleted.some(prefix => recordKey.startsWith(prefix))
            )
              throw new Error('Invalid batch record scope.')
            records.put(recordValue, recordKey)
          }
          for (const recordKey of options.deleteKeys ?? []) {
            if (recordKey === key || recordKey === DELETED_PREFIXES)
              throw new Error('Invalid batch record deletion.')
            records.delete(recordKey)
          }
          const prefixes = options.deletePrefixes ?? []
          if (prefixes.length) {
            if (
              !update ||
              prefixes.some(prefix => !prefix || key.startsWith(prefix))
            )
              throw new Error('Invalid IndexedDB deletion scope.')
            records.put(
              [...new Set([...deleted, ...prefixes])],
              DELETED_PREFIXES
            )
            const cursor = records.openCursor()
            cursor.onsuccess = () => {
              const entry = cursor.result
              if (!entry) return
              if (
                typeof entry.key === 'string' &&
                prefixes.some(prefix => entry.key.toString().startsWith(prefix))
              )
                entry.delete()
              entry.continue()
            }
          }
        } catch (cause) {
          failure = cause
          transaction.abort()
        }
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

export const readIndexedDBValue = async <T>(
  key: string
): Promise<T | undefined> => {
  const database = await openDatabase(globalThis.indexedDB)
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(RECORDS, 'readonly')
    const request = transaction.objectStore(RECORDS).get(key)
    let value: T | undefined
    request.onsuccess = () => {
      value = request.result as T | undefined
    }
    transaction.oncomplete = () => {
      database.close()
      resolve(value)
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error)
    }
  })
}
