import reactPackage from '@vezham/react/package.json'

type LibraryDefinition = {
  title: string
  selectorVersion?: string
  description?: string
  badge?: string
  disabled?: boolean
  routeBase: string
}

export const uiLibraries = {
  react: {
    title: 'Vezham',
    selectorVersion: reactPackage.version,
    routeBase: '/docs/ui/react'
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
  { id: 'current', items: ['react'] },
  { id: 'v3', title: 'v3', items: ['react-v3', 'react-pro-v3'] }
]

export const uiPlatforms = { web: 'Web', native: 'Native' } as const

export const getUiLibrary = (id: UiLibrary): LibraryDefinition =>
  uiLibraries[id]

export const getUiLibrarySelectorTitle = (id: UiLibrary) => {
  const library = getUiLibrary(id)
  return library.selectorVersion
    ? `${library.title} ${library.selectorVersion}`
    : library.title
}

export const getUiLibrarySectionTitle = (
  id: UiLibrary,
  platform: keyof typeof uiPlatforms
) => `${uiLibraries[id].title} ${uiPlatforms[platform]}`
