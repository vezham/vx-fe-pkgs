import { createContext, useContext } from 'react'

export interface AppIdentity {
  readonly id: string
  readonly name: string
  readonly version: string
  readonly environment: string
  readonly runtime: string
}

export const AppContext = createContext<AppIdentity | undefined>(undefined)

export const useApp = () => useContext(AppContext)
