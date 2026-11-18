import type { ComponentType } from 'react'

import { layoutDemos } from './layouts'

export const reactDemos: Record<
  string,
  { loader: () => Promise<ComponentType>; file: string }
> = {
  'react-install-tabs-default': {
    file: 'install-tabs/default.tsx',
    loader: () =>
      import('./install-tabs/default').then(module => module.Default)
  },
  'react-install-tabs-development': {
    file: 'install-tabs/development.tsx',
    loader: () =>
      import('./install-tabs/development').then(module => module.Development)
  },
  'react-bento-default': {
    file: 'bento/default.tsx',
    loader: () => import('./bento/default').then(module => module.Default)
  },
  'react-card-gallery-default': {
    file: 'card-gallery/default.tsx',
    loader: () =>
      import('./card-gallery/default').then(module => module.Default)
  },
  ...layoutDemos,
  'react-sidebar-group-default': {
    file: 'sidebar-group/default.tsx',
    loader: () =>
      import('./sidebar-group/default').then(module => module.Default)
  },
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
  },
  'react-video-player-default': {
    file: 'video-player/default.tsx',
    loader: () =>
      import('./video-player/default').then(module => module.Default)
  },
  'react-video-player-themed': {
    file: 'video-player/themed.tsx',
    loader: () => import('./video-player/themed').then(module => module.Themed)
  }
}
