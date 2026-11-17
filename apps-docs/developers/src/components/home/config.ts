import { Book, Box, Layers, Palette } from '@vezham/icons-react'

import { uiLibraries } from '@config/ui-libraries'

export type HomeSection = {
  id: string
  title: string
  headline: string
  content: string
  href: string
  action: string
  layout?: string
  appearance?: string
  icon?: typeof Box
  visual?: 'ui' | 'handbook'
}

export type HomeFeatureSection = HomeSection & {
  visual: 'ui' | 'handbook'
}

const uiSection = {
  id: 'ui',
  title: 'UI',
  headline: 'Your next interface starts here.',
  content: 'Components and patterns for your next interface.',
  href: uiLibraries.react.routeBase,
  action: 'Explore UI',
  layout: 'md:col-span-2',
  appearance: 'bg-[#ffe283] text-[#482111]',
  icon: Layers,
  visual: 'ui'
} satisfies HomeFeatureSection

const handbookSection = {
  id: 'handbook',
  title: 'Handbook',
  headline: 'Built on shared ideas.',
  content: 'Libraries, architecture, and the principles behind our products.',
  href: '/handbook/markdown',
  action: 'Read the handbook',
  layout: 'md:row-span-2',
  icon: Book,
  visual: 'handbook'
} satisfies HomeFeatureSection

const assetsSection = {
  id: 'assets',
  title: 'Assets',
  headline: 'Find the right detail. Make it yours.',
  content: 'Icons, illustrations, and brand logos.',
  href: '/docs/assets/icons',
  action: 'Browse assets',
  appearance: 'bg-[#40134f] text-[#dfc4f2]',
  icon: Palette
} satisfies HomeSection

const packagesSection = {
  id: 'packages',
  title: 'Packages',
  headline: 'Your favorite tools. One library.',
  content: 'Packages for your app, editor, and design workflow.',
  href: '/docs/packages',
  action: 'View packages',
  appearance: 'bg-[#cbbbec] text-[#40134f]',
  icon: Box
} satisfies HomeSection

export const homeSections: readonly HomeSection[] = [
  uiSection,
  handbookSection,
  assetsSection,
  packagesSection
]

type HomeGalleryGroup =
  | {
      id: string
      title: string
      kind: 'feature'
      section: HomeFeatureSection
    }
  | {
      id: string
      title: string
      kind: 'tiles'
      sections: readonly HomeSection[]
    }

export const homeGallery = [
  {
    id: 'ui',
    title: 'UI',
    kind: 'feature',
    section: uiSection
  },
  {
    id: 'resources',
    title: 'Assets and packages',
    kind: 'tiles',
    sections: [assetsSection, packagesSection]
  },
  {
    id: 'handbook',
    title: 'Handbook',
    kind: 'feature',
    section: handbookSection
  }
] satisfies readonly HomeGalleryGroup[]
