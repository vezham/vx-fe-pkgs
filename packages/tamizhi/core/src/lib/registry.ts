import type { Registry } from './types'

export const createRegistry = <T>(onRemove?: () => void): Registry<T> => {
  const values = new Map<string, T>()
  return {
    register: (context, id, value) => {
      if (values.has(id)) throw new Error(`Duplicate registration: ${id}`)
      context.effect(() => {
        values.set(id, value)
        return () => {
          values.delete(id)
          onRemove?.()
        }
      })
    },
    get: id => values.get(id),
    entries: () => [...values.entries()]
  }
}
