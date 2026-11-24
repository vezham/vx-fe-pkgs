import { useEffect, useState } from 'react'

export const useSessionStorageValue = (key: string) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(window.sessionStorage.getItem(key) ?? '')
  }, [key])

  return value
}
