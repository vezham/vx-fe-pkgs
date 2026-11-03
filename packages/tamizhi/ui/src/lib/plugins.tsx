import { createContext, useContext } from 'react'
import type { ComponentType, ReactNode } from 'react'

import type { ChatMessageRecord } from '@vezham/tamizhi-contracts'

export type TamizhiUISlot = 'welcome' | 'message-actions' | 'composer-actions'
export interface TamizhiSlotContext {
  message?: ChatMessageRecord
}
export interface TamizhiUIPlugin {
  name: string
  slots: Partial<Record<TamizhiUISlot, ComponentType<TamizhiSlotContext>>>
}
const UIPluginsContext = createContext<readonly TamizhiUIPlugin[]>([])
export const TamizhiUIProvider = ({
  plugins,
  children
}: {
  plugins: readonly TamizhiUIPlugin[]
  children: ReactNode
}) => {
  if (new Set(plugins.map(plugin => plugin.name)).size !== plugins.length)
    throw new Error('Tamizhi UI plugin names must be unique')
  return (
    <UIPluginsContext.Provider value={plugins}>
      {children}
    </UIPluginsContext.Provider>
  )
}
export const TamizhiPluginSlot = ({
  name,
  message
}: {
  name: TamizhiUISlot
  message?: ChatMessageRecord
}) => {
  const plugins = useContext(UIPluginsContext)
  return plugins.map(plugin => {
    const Component = plugin.slots[name]
    return Component ? <Component key={plugin.name} message={message} /> : null
  })
}
