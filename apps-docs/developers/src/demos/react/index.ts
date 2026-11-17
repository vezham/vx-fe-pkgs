import type { ComponentType } from 'react'

export const reactDemos: Record<
  string,
  { loader: () => Promise<ComponentType>; file: string }
> = {
  'react-brand-channels': {
    file: 'brand/channels.tsx',
    loader: () => import('./brand/channels').then(module => module.Channels)
  },
  'react-brand-default': {
    file: 'brand/default.tsx',
    loader: () => import('./brand/default').then(module => module.Default)
  },
  'react-brand-link': {
    file: 'brand/link.tsx',
    loader: () => import('./brand/link').then(module => module.Link)
  },
  'react-brand-logo-sizes': {
    file: 'brand/logo-sizes.tsx',
    loader: () => import('./brand/logo-sizes').then(module => module.LogoSizes)
  }
}
