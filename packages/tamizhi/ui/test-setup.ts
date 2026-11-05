import { cleanup } from '@testing-library/react'
import { IDBFactory } from 'fake-indexeddb'
import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => vi.stubGlobal('indexedDB', new IDBFactory()))
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

export const seedIndexedDB = (key: string, value: unknown): Promise<void> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('vezham', 1)
    request.onupgradeneeded = () => request.result.createObjectStore('records')
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const database = request.result
      const transaction = database.transaction('records', 'readwrite')
      transaction.objectStore('records').put(value, key)
      transaction.oncomplete = () => {
        database.close()
        resolve()
      }
      transaction.onabort = () => {
        database.close()
        reject(transaction.error)
      }
    }
  })
