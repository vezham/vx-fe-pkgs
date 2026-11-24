import { useSyncExternalStore } from 'react'

const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  window.addEventListener('hashchange', onChange)

  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener('hashchange', onChange)
  }
}

const getSnapshot = () => window.location.search
const getServerSnapshot = () => null

export const useBrowserSearch = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
