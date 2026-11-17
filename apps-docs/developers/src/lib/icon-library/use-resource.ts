import { useEffect, useState } from 'react'

export const useResource = <T>(key: string, load: () => Promise<T>) => {
  const [attempt, setAttempt] = useState(0)
  const resourceKey = `${key}:${attempt}`
  const [state, setState] = useState<{
    key: string
    data?: T
    error?: string
  }>()
  useEffect(() => {
    let active = true
    void load().then(
      data => {
        if (active) setState({ key: resourceKey, data })
      },
      (error: unknown) => {
        if (active)
          setState({
            key: resourceKey,
            error:
              error instanceof Error
                ? error.message
                : 'Something went wrong. Please try again.'
          })
      }
    )
    return () => {
      active = false
    }
  }, [resourceKey, load])
  const current = state?.key === resourceKey ? state : undefined
  return {
    data: current?.data,
    error: current?.error,
    loading: !current,
    retry: () => setAttempt(value => value + 1)
  }
}
