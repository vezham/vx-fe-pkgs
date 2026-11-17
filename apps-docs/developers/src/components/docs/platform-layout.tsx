import type { DocsLayoutProps } from '@vezham/start/layouts/docs'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import {
  PlatformDrawerFooter,
  PlatformDrawerHeader
} from '@components/docs/platform-drawer'
import { PlatformNotebookHeader } from '@components/docs/platform-notebook-header'
import { getPlatformSections } from '@components/docs/platform-sections'
import { PlatformTabs } from '@components/docs/platform-tabs'
import { baseOptions } from '@config/layout'
import { type UiLibrary, uiLibraries } from '@config/ui-libraries'
import type { Locale } from '@generated/vx'

type Platform = 'web' | 'native'

type Options = {
  library?: UiLibrary
  locale: Locale
  page: string
  platform: Platform
  platforms: readonly Platform[]
  selectedSection: string
  getPlatformParams: (platform: Platform) => {
    lang: string | undefined
    platform: Platform
    _splat: string
  }
}

export const getPlatformLayoutOptions = ({
  library = 'react',
  locale,
  page,
  platform,
  platforms,
  selectedSection,
  getPlatformParams
}: Options): Omit<DocsLayoutProps, 'children' | 'shell' | 'tree'> => {
  const options = baseOptions(locale)
  return {
    ...options,
    nav: {
      ...options.nav,
      mode: 'top',
      children: (
        <PlatformTabs
          library={library}
          getPlatformParams={getPlatformParams}
          platform={platform}
          platforms={platforms}
        />
      )
    },
    sidebar: {
      banner: props => (
        <PlatformDrawerHeader
          {...props}
          library={library}
          getPlatformParams={getPlatformParams}
          locale={locale}
          platform={platform}
          platforms={platforms}
          selectedSection={selectedSection}
        />
      ),
      footer: props => (
        <PlatformDrawerFooter
          {...props}
          library={library}
          getPlatformParams={getPlatformParams}
          platform={platform}
          platforms={platforms}
        />
      )
    },
    tabMode: 'navbar',
    slots: {
      header: props => (
        <PlatformNotebookHeader
          {...props}
          library={library}
          locale={locale}
          platform={platform}
          selectedSection={selectedSection}
        />
      )
    },
    tabs: getPlatformSections(platform, library, locale).map(item => ({
      title: item.title,
      url: localizedUrl(
        i18n,
        locale,
        `${uiLibraries[library].routeBase}/${platform}/${item.page}`
      ),
      urls:
        item.id === selectedSection
          ? new Set([
              localizedUrl(
                i18n,
                locale,
                `${uiLibraries[library].routeBase}/${platform}/${page}`
              )
            ])
          : undefined
    }))
  }
}
