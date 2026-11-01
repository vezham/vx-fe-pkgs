import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

import { useDemoChat } from './use-demo-chat'

const useSession = (storageKey: string) => {
  const [isInstant, setIsInstant] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const chat = useDemoChat(isInstant, undefined, storageKey)
  return { chat, isInstant, setIsInstant, isOffline, setIsOffline }
}
const SessionContext = createContext<ReturnType<typeof useSession> | null>(null)

export interface TamizhiSessionProviderProps {
  children: ReactNode
  storageKey?: string
}

export const TamizhiSessionProvider = ({
  children,
  storageKey = 'tamizhi.embed.demo.v1'
}: TamizhiSessionProviderProps) => {
  const session = useSession(storageKey)
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
