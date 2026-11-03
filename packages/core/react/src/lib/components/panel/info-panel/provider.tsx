import { useHotkey } from '@tanstack/react-hotkeys'
import { createContext, useCallback, useContext, useMemo } from 'react'

import { useLocalStore } from '@vezham/hooks'

import { ActiveInfoPanel, InfoPanelContextValue } from './types'

const InfoPanelContext = createContext<InfoPanelContextValue | null>(null)
const STORAGE_KEY = 'vx-app:info-panel'
const VALID_INFO_PANELS: Array<Exclude<ActiveInfoPanel, null>> = [
  'bookmarks',
  'storage',
  'tamizhi'
]

interface StoredInfoPanelState {
  activeInfoPanel: ActiveInfoPanel
  isOpen: boolean
}

const isInfoPanel = (panel: unknown): panel is Exclude<ActiveInfoPanel, null> =>
  typeof panel === 'string' &&
  VALID_INFO_PANELS.includes(panel as Exclude<ActiveInfoPanel, null>)

const INITIAL_PANEL_STATE: StoredInfoPanelState = {
  activeInfoPanel: null,
  isOpen: false
}
const parsePanelState = (value: unknown): StoredInfoPanelState => {
  if (!value || typeof value !== 'object') return INITIAL_PANEL_STATE
  const parsedValue = value as Partial<StoredInfoPanelState>
  const storedPanel: unknown = parsedValue.activeInfoPanel
  const migratedPanel = storedPanel === 'disc' ? 'storage' : storedPanel
  const activeInfoPanel = isInfoPanel(migratedPanel) ? migratedPanel : null
  return {
    activeInfoPanel,
    isOpen: Boolean(parsedValue.isOpen && activeInfoPanel)
  }
}

const InfoPanelProvider = ({ children }: { children: React.ReactNode }) => {
  const { value: state, setValue: setState } = useLocalStore(
    STORAGE_KEY,
    INITIAL_PANEL_STATE,
    {
      parse: parsePanelState
    }
  )
  const { activeInfoPanel, isOpen } = state

  const setActiveInfoPanel = useCallback(
    (panel: ActiveInfoPanel) => {
      setState({
        activeInfoPanel: panel,
        isOpen: Boolean(panel)
      })
    },
    [setState]
  )

  const openInfoPanel = useCallback(
    (panel: Exclude<ActiveInfoPanel, null>) =>
      setState({ activeInfoPanel: panel, isOpen: true }),
    [setState]
  )

  const closeInfoPanel = useCallback(() => {
    setState(current => ({ ...current, isOpen: false }))
  }, [setState])

  const toggleInfoPanel = useCallback(
    (panel: Exclude<ActiveInfoPanel, null>) => {
      setState(current =>
        current.activeInfoPanel === panel && current.isOpen
          ? { ...current, isOpen: false }
          : { activeInfoPanel: panel, isOpen: true }
      )
    },
    [setState]
  )

  useHotkey('Mod+Shift+B', () => toggleInfoPanel('bookmarks'), {
    preventDefault: true,
    ignoreInputs: true
  })

  useHotkey('Mod+Shift+S', () => toggleInfoPanel('storage'), {
    preventDefault: true,
    ignoreInputs: true
  })

  const value = useMemo(
    () => ({
      activeInfoPanel,
      isOpen,
      setActiveInfoPanel,
      openInfoPanel,
      closeInfoPanel,
      toggleInfoPanel
    }),
    [
      activeInfoPanel,
      closeInfoPanel,
      isOpen,
      openInfoPanel,
      setActiveInfoPanel,
      toggleInfoPanel
    ]
  )

  return (
    <InfoPanelContext.Provider value={value}>
      {children}
    </InfoPanelContext.Provider>
  )
}

export { InfoPanelProvider }

export const useInfoPanel = () => {
  const context = useContext(InfoPanelContext)

  if (!context) {
    throw new Error('useInfoPanel must be used within InfoPanelProvider')
  }

  return context
}
