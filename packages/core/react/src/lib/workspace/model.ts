export interface LocalWorkspace {
  id: string
  name: string
  storage: 'local'
  createdAt: number
}

export interface WorkspaceCatalog {
  workspaces: LocalWorkspace[]
}

export const workspaceSelectionKey = (appId: string) =>
  `vezham:${encodeURIComponent(appId)}:current-workspace`

export const workspaceCatalogKey = (appId: string) =>
  `vezham:${encodeURIComponent(appId)}:workspaces`

export const workspaceDataKey = (
  appId: string,
  workspaceId: string,
  key: string
) =>
  `vezham:${encodeURIComponent(appId)}:workspace:${encodeURIComponent(workspaceId)}:${encodeURIComponent(key)}`

const normalizeWorkspaceName = (name: string) => {
  const trimmed = name.trim()
  if (!trimmed || trimmed.length > 64)
    throw new Error('Use a workspace name between 1 and 64 characters.')
  return trimmed
}

export const createInitialWorkspaceCatalog = (
  name: string
): WorkspaceCatalog => ({
  workspaces: [
    {
      id: 'default',
      name: normalizeWorkspaceName(name),
      storage: 'local',
      createdAt: 0
    }
  ]
})

export const parseWorkspaceCatalog = (input: unknown): WorkspaceCatalog => {
  if (!input || typeof input !== 'object')
    throw new Error('Invalid workspace catalog')
  const value = input as Partial<WorkspaceCatalog>
  if (!Array.isArray(value.workspaces) || value.workspaces.length === 0)
    throw new Error('Invalid workspace catalog')
  const valid = value.workspaces.every(
    item =>
      item &&
      typeof item.id === 'string' &&
      item.id.length > 0 &&
      item.id.length <= 128 &&
      typeof item.name === 'string' &&
      item.name.trim().length > 0 &&
      item.name.length <= 64 &&
      item.storage === 'local' &&
      typeof item.createdAt === 'number' &&
      Number.isFinite(item.createdAt) &&
      item.createdAt >= 0
  )
  if (
    !valid ||
    new Set(value.workspaces.map(item => item.id)).size !==
      value.workspaces.length
  )
    throw new Error('Invalid workspace catalog')
  return { workspaces: value.workspaces }
}

export const createLocalWorkspace = (name: string): LocalWorkspace => {
  const trimmed = normalizeWorkspaceName(name)
  const bytes = new Uint32Array(4)
  globalThis.crypto.getRandomValues(bytes)
  return {
    id: `local-${Array.from(bytes, part => part.toString(16).padStart(8, '0')).join('')}`,
    name: trimmed,
    storage: 'local',
    createdAt: Date.now()
  }
}
