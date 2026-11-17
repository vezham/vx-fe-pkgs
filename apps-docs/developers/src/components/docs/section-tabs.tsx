import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { useNotebookLayout } from '@vezham/docs-react/layouts/notebook'
import { Sidebar } from '@vezham/icons-react'

import { i18n } from '@app/docs'
import { getUiLibraryRoute } from '@components/docs/library-routes'
import { sectionTabVariants } from '@components/docs/navigation.variants'
import { getPlatformSections } from '@components/docs/platform-sections'
import type { UiLibrary } from '@config/ui-libraries'
import type { Locale } from '@generated/vx'

type Props = {
  library?: UiLibrary
  locale: Locale
  platform: 'web' | 'native'
  selectedSection: string
}

export const SectionTabs = ({
  library = 'react',
  locale,
  platform,
  selectedSection
}: Props) => {
  return (
    <NotebookSectionTabs>
      {getPlatformSections(platform, library, locale).map(item => (
        <Link
          key={item.id}
          to={getUiLibraryRoute(library)}
          params={{
            lang: locale === i18n.defaultLanguage ? undefined : locale,
            platform,
            _splat: item.page
          }}
          className={sectionTabVariants({
            selected: item.id === selectedSection
          })}>
          {item.title}
        </Link>
      ))}
    </NotebookSectionTabs>
  )
}

export const NotebookSectionTabs = ({
  children,
  label = 'Documentation sections',
  desktopSidebar = true
}: {
  children: ReactNode
  label?: string
  desktopSidebar?: boolean
}) => {
  const { props: layoutProps, slots } = useNotebookLayout()
  const SidebarCollapseTrigger = slots.sidebar.collapseTrigger

  return (
    <div
      data-header-tabs=""
      className={`flex h-10 items-center border-b px-4 md:px-6 ${desktopSidebar ? 'max-lg:hidden' : 'max-md:hidden'}`}>
      {desktopSidebar ? (
        <SidebarCollapseTrigger
          aria-label="Collapse sidebar"
          className="text-muted hover:bg-default-hover hover:text-foreground -ms-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md">
          <Sidebar size={16} />
        </SidebarCollapseTrigger>
      ) : (
        <span aria-hidden="true" className="-ms-1 size-8 shrink-0" />
      )}
      <nav aria-label={label} className="ms-3 flex h-full items-end gap-6">
        {children}
      </nav>
      <div className="ms-auto shrink-0">{layoutProps.nav?.children}</div>
    </div>
  )
}
