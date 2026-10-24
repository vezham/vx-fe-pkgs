import { createContext, useContext } from 'react'

export type SettingsSection =
  | 'General'
  | 'Appearance'
  | 'Notifications'
  | 'Account'
  | 'Widget Center'
  | 'Control Center'
export const SettingsNavigationContext = createContext<
  ((section: SettingsSection) => void) | null
>(null)
export const useSettingsNavigation = () => useContext(SettingsNavigationContext)
