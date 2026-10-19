import { type Dispatch, type SetStateAction, useEffect } from 'react'

export const useToastTimeout = <Toast>(
  toast: Toast | null,
  setToast: Dispatch<SetStateAction<Toast | null>>
) => {
  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toast, setToast])
}
