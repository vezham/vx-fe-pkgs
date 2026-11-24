import authReactPackage from '@vezham/auth-ui-react/package.json'

export const uiPlatforms = { web: 'Web', native: 'Native' } as const

export type UiPlatform = keyof typeof uiPlatforms

type LibraryDefinition = {
  title: string
  description?: string
  badge?: string
  disabled?: boolean
  routeBase: string
}

export const uiLibraries = {
  react: {
    title: 'Vezham React',
    routeBase: '/docs/ui/react'
  },
  auth: {
    title: 'Vezham Auth',
    description: 'Authentication components, plugins, and integrations',
    routeBase: '/docs/ui/auth'
  },
  'react-v3': {
    title: 'Vezham v3',
    description: 'Open source components and patterns',
    routeBase: '/docs/ui/react-v3'
  },
  'react-pro-v3': {
    title: 'Vezham Pro v3',
    description: 'Components, themes and templates',
    routeBase: '/docs/ui/react-pro-v3'
  }
} as const satisfies Record<string, LibraryDefinition>

export type UiLibrary = keyof typeof uiLibraries

export const uiLibrarySections: {
  id: string
  title?: string
  items: UiLibrary[]
}[] = [
  {
    id: 'packages',
    title: authReactPackage.version,
    items: ['react', 'auth']
  },
  { id: 'v3', title: 'v3', items: ['react-v3', 'react-pro-v3'] }
]

export const getUiLibrary = (id: UiLibrary): LibraryDefinition =>
  uiLibraries[id]

export const getUiLibrarySelectorTitle = (id: UiLibrary) =>
  getUiLibrary(id).title

export const getUiLibrarySectionTitle = (
  id: UiLibrary,
  platform: keyof typeof uiPlatforms
) => `${uiLibraries[id].title} ${uiPlatforms[platform]}`
