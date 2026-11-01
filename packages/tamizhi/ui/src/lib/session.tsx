import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

import type { TamizhiClient } from '@vezham/tamizhi-client'

import { useDemoChat } from './use-demo-chat'

const useSession = (storageKey: string, client?: TamizhiClient) => {
  const [isInstant, setIsInstant] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const chat = useDemoChat(isInstant, undefined, storageKey, client)
  return { chat, isInstant, setIsInstant, isOffline, setIsOffline }
}
const SessionContext = createContext<ReturnType<typeof useSession> | null>(null)

export interface TamizhiSessionProviderProps {
  children: ReactNode
  storageKey?: string
  client?: TamizhiClient
}

export const TamizhiSessionProvider = ({
  children,
  storageKey = 'tamizhi.embed.demo.v1',
  client
}: TamizhiSessionProviderProps) => {
  const session = useSession(storageKey, client)
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export const useTamizhiSession = () => {
  const session = useContext(SessionContext)
  if (!session) throw new Error('Tamizhi embed requires TamizhiSessionProvider')
  return session
}
