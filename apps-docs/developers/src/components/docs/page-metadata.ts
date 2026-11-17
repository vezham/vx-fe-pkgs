import { createContext } from 'react'

export const PageMetadata = createContext<{
  platform: 'web' | 'native'
  github?: { pull?: number }
}>({ platform: 'web' })
