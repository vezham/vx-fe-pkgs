export const createEventQueue = <T extends object>() => {
  const values: T[] = []
  let wake: (() => void) | undefined
  let ended = false
  let failure: Error | undefined
  return {
    push: (value: T) => {
      if (ended) return
      if (values.length >= 4096) throw new Error('Stream consumer is too slow')
      values.push(value)
      wake?.()
    },
    fail: (error: Error) => {
      failure = error
      ended = true
      values.length = 0
      wake?.()
    },
    close: () => {
      ended = true
      wake?.()
    },
    stream: async function* (): AsyncGenerator<T> {
      while (!ended || values.length || failure) {
        if (failure) throw failure
        if (values.length) {
          const value = values.shift()
          if (value) yield value
        } else
          await new Promise<void>(resolve => {
            wake = resolve
          })
      }
    }
  }
}
