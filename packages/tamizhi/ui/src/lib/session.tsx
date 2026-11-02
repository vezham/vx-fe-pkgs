import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

import type { TamizhiClient } from '@vezham/tamizhi-client'
import type { TamizhiProfileOptions } from '@vezham/tamizhi-contracts'

import { useDemoChat } from './use-demo-chat'

const useSession = (
  storageKey: string,
  client: TamizhiClient | undefined,
  options: TamizhiProfileOptions
) => {
  const [isInstant, setIsInstant] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const chat = useDemoChat(isInstant, undefined, storageKey, client, options)
  return { chat, isInstant, setIsInstant, isOffline, setIsOffline }
}
const SessionContext = createContext<ReturnType<typeof useSession> | null>(null)

export interface TamizhiSessionProviderProps extends TamizhiProfileOptions {
  children: ReactNode
  storageKey?: string
  client?: TamizhiClient
}

export const TamizhiSessionProvider = ({
  children,
  storageKey = 'tamizhi.embed.demo.v1',
  client,
  appId,
  profiles
}: TamizhiSessionProviderProps) => {
  const session = useSession(
    `${storageKey}.${appId ?? 'vezham-tamizhi'}`,
    client,
    {
      appId,
      profiles
    }
  )
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
