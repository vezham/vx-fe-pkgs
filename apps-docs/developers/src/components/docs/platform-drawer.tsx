import type { ComponentProps } from 'react'

import { Notebook } from '@vezham/react/layouts/notebook'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { getPlatformSections } from '@components/docs/platform-sections'
import { PlatformTabs } from '@components/docs/platform-tabs'
import { getNotebookConfig, notebookDrawerFooterProps } from '@config/notebook'
import { type UiLibrary, uiLibraries } from '@config/ui-libraries'
import type { Locale } from '@generated/vx'

type Platform = 'web' | 'native'

type PlatformNavigationProps = {
  library?: UiLibrary
  getPlatformParams: (platform: Platform) => {
    _splat: string
    lang: string | undefined
    platform: Platform
  }
  platform: Platform
  platforms: readonly Platform[]
}

type HeaderProps = ComponentProps<'div'> &
  PlatformNavigationProps & {
    locale: Locale
    selectedSection: string
  }

export const PlatformDrawerHeader = ({
  library = 'react',
  children,
  className,
  getPlatformParams,
  locale,
  platform,
  platforms,
  selectedSection,
  ...props
}: HeaderProps) => {
  return (
    <Notebook.Drawer.Header
      {...props}
      className={className}
      {...getNotebookConfig(locale).drawerHeaderProps}
      selectedSection={selectedSection}
      sections={getPlatformSections(platform, library, locale).map(section => ({
        id: section.id,
        title: section.title,
        url: localizedUrl(
          i18n,
          locale,
          `${uiLibraries[library].routeBase}/${platform}/${section.page}`
        )
      }))}
      secondary={
        <PlatformTabs
          library={library}
          getPlatformParams={getPlatformParams}
          platform={platform}
          platforms={platforms}
        />
      }>
      {children}
    </Notebook.Drawer.Header>
  )
}

export const PlatformDrawerFooter = ({
  library = 'react',
  className,
  getPlatformParams,
  platform,
  platforms,
  ...props
}: ComponentProps<'div'> & PlatformNavigationProps) => {
  return (
    <Notebook.Drawer.Footer
      {...notebookDrawerFooterProps}
      {...props}
      className={className}
      secondary={
        <PlatformTabs
          library={library}
          getPlatformParams={getPlatformParams}
          platform={platform}
          platforms={platforms}
        />
      }
    />
  )
}
