import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

import { useApp, useIndexedDBStore, useLocalStore } from '@vezham/hooks'
import type { IndexedDBStoreOptions } from '@vezham/hooks'

import {
  createInitialWorkspaceCatalog,
  createLocalWorkspace,
  normalizeWorkspaceName,
  parseWorkspaceCatalog,
  workspaceCatalogKey,
  workspaceDataKey,
  workspaceSelectionKey
} from './model'
import type { LocalWorkspace } from './model'

interface WorkspaceContextValue {
  appId: string
  active: LocalWorkspace
  workspaces: readonly LocalWorkspace[]
  isReady: boolean
  isSaved: boolean
  error: unknown
  create: (name: string) => Promise<string | null>
  select: (id: string) => void
  rename: (id: string, name: string) => Promise<boolean>
  remove: (id: string) => Promise<boolean>
}

const parseWorkspaceSelection = (value: unknown) =>
  typeof value === 'string' && value.length > 0 && value.length <= 128
    ? value
    : 'default'

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export interface WorkspaceProviderProps {
  children: ReactNode
  appId?: string
  defaultName?: string
}

export const WorkspaceProvider = ({
  children,
  appId: explicitAppId,
  defaultName = 'My Workspace'
}: WorkspaceProviderProps) => {
  const app = useApp()
  const appId = explicitAppId ?? app?.id
  if (!appId)
    throw new Error(
      'WorkspaceProvider requires an app ID or an app identity provider.'
    )
  return (
    <WorkspaceScope key={appId} appId={appId} defaultName={defaultName}>
      {children}
    </WorkspaceScope>
  )
}

const WorkspaceScope = ({
  children,
  appId,
  defaultName
}: Required<Pick<WorkspaceProviderProps, 'appId' | 'defaultName'>> &
  Pick<WorkspaceProviderProps, 'children'>) => {
  const initial = useMemo(
    () => createInitialWorkspaceCatalog(defaultName),
    [defaultName]
  )
  const {
    value: catalog,
    setValue,
    isReady,
    isSaved,
    error
  } = useIndexedDBStore(workspaceCatalogKey(appId), initial, {
    parse: parseWorkspaceCatalog
  })
  const {
    value: selectedId,
    setValue: setSelection,
    isReady: selectionReady,
    isSaved: selectionSaved,
    error: selectionError
  } = useLocalStore(workspaceSelectionKey(appId), 'default', {
    parse: parseWorkspaceSelection
  })
  const active =
    catalog.workspaces.find(item => item.id === selectedId) ??
    catalog.workspaces[0]
  const create = useCallback(
    async (name: string) => {
      if (!isReady || !selectionReady || error) return null
      const workspace = createLocalWorkspace(name)
      const saved = await setValue(current => ({
        workspaces: [...current.workspaces, workspace]
      }))
      if (!saved) return null
      setSelection(workspace.id)
      return workspace.id
    },
    [isReady, selectionReady, error, setValue, setSelection]
  )
  const select = useCallback(
    (id: string) => {
      if (
        !isReady ||
        !selectionReady ||
        error ||
        !catalog.workspaces.some(item => item.id === id)
      )
        return
      setSelection(id)
    },
    [isReady, selectionReady, error, catalog.workspaces, setSelection]
  )
  const rename = useCallback(
    async (id: string, name: string) => {
      if (!isReady || error) return false
      const normalized = normalizeWorkspaceName(name)
      if (!catalog.workspaces.some(item => item.id === id)) return false
      return setValue(current => ({
        workspaces: current.workspaces.map(item =>
          item.id === id ? { ...item, name: normalized } : item
        )
      }))
    },
    [isReady, error, catalog.workspaces, setValue]
  )
  const remove = useCallback(
    async (id: string) => {
      if (
        !isReady ||
        error ||
        catalog.workspaces.length <= 1 ||
        !catalog.workspaces.some(item => item.id === id)
      )
        return false
      const saved = await setValue(
        current => {
          const remaining = current.workspaces.filter(item => item.id !== id)
          if (!remaining.length) throw new Error('Keep at least one workspace.')
          return { workspaces: remaining }
        },
        { deletePrefixes: [workspaceDataKey(appId, id, '')], optimistic: false }
      )
      if (saved) {
        const next = catalog.workspaces.find(item => item.id !== id)
        if (next) setSelection(current => (current === id ? next.id : current))
      }
      return saved
    },
    [isReady, error, catalog.workspaces, setValue, appId, setSelection]
  )
  const ready = isReady && selectionReady
  const storageError = error ?? selectionError
  const saved = isSaved && selectionSaved
  const value = useMemo(
    () => ({
      appId,
      active,
      workspaces: catalog.workspaces,
      isReady: ready,
      isSaved: saved,
      error: storageError,
      create,
      rename,
      remove,
      select
    }),
    [
      appId,
      active,
      catalog.workspaces,
      ready,
      saved,
      storageError,
      create,
      rename,
      remove,
      select
    ]
  )
  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useOptionalWorkspace = () => useContext(WorkspaceContext)

export const useWorkspace = () => {
  const workspace = useOptionalWorkspace()
  if (!workspace) throw new Error('useWorkspace requires WorkspaceProvider.')
  return workspace
}

export const useWorkspaceStore = <T,>(
  key: string,
  initialValue: T,
  options: IndexedDBStoreOptions<T> = {}
) => {
  const { appId, active, isReady } = useWorkspace()
  return useIndexedDBStore(
    workspaceDataKey(appId, active.id, key),
    initialValue,
    { ...options, enabled: isReady && options.enabled !== false }
  )
}

export type { LocalWorkspace } from './model'
