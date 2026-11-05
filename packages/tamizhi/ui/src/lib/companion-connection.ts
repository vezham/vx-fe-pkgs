import { useSyncExternalStore } from 'react'

import type { TamizhiClient } from '@vezham/tamizhi-client'

interface CompanionConnection {
  client: TamizhiClient
  endpoint: string
}
let current: CompanionConnection | undefined
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
const snapshot = () => current
const prerender = () => undefined
// vx-bot/NOTE: Pairing credentials stay in memory and never enter localStorage or prerendered HTML.
export const setCompanionConnection = (
  connection: CompanionConnection | undefined
) => {
  current = connection
  for (const listener of listeners) listener()
}
export const useCompanionConnection = () =>
  useSyncExternalStore(subscribe, snapshot, prerender)
export const useCompanionClient = (configured?: TamizhiClient) =>
  useCompanionConnection()?.client ?? configured
