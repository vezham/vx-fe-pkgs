import { Link as RouterLink, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import type { Root } from '@vezham/docs-core/page-tree'
import { DocsPage as NotebookPage } from '@vezham/docs-react/layouts/notebook/page'
import { DocsLayout, type DocsLayoutProps } from '@vezham/start/layouts/docs'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { sectionTabVariants } from '@components/docs/navigation.variants'
import {
  NotebookDrawerFooter,
  NotebookDrawerHeader
} from '@components/docs/notebook-drawer'
import { NotebookHeader } from '@components/docs/notebook-header'
import { NotebookSectionTabs } from '@components/docs/section-tabs'
import { baseOptions } from '@config/layout'
import type { Locale } from '@generated/vx'
import { catalogRoutes, kindLabels } from '@src/lib/icon-library/catalog'

const navigation = [
  {
    id: 'icons',
    title: kindLabels.icons,
    to: `/{-$lang}${catalogRoutes.icons}`
  },
  {
    id: 'illustrations',
    title: kindLabels.illustrations,
    to: `/{-$lang}${catalogRoutes.illustrations}`
  },
  {
    id: 'logos',
    title: kindLabels.logos,
    to: `/{-$lang}${catalogRoutes.logos}`
  },
  { id: 'docs', title: 'Guides', to: '/{-$lang}/docs/assets/guides' },
  { id: 'packages', title: 'Packages', to: '/{-$lang}/docs/assets/packages' },
  { id: 'faq', title: 'FAQ', to: '/{-$lang}/docs/assets/faq' }
] as const
type AssetSection = (typeof navigation)[number]['id']
const sectionUrl = (locale: Locale, path: string) =>
  localizedUrl(i18n, locale, path.replace('/{-$lang}', ''))

const AssetNavigation = ({
  active,
  locale
}: {
  active: AssetSection
  locale: Locale
}) => (
  <NotebookSectionTabs
    label="Icon library sections"
    desktopSidebar={active === 'docs'}>
    {navigation.map(item => (
      <RouterLink
        key={item.id}
        to={item.to}
        params={{
          lang: locale === i18n.defaultLanguage ? undefined : locale
        }}
        aria-current={item.id === active ? 'page' : undefined}
        className={sectionTabVariants({ selected: item.id === active })}>
        {item.title}
      </RouterLink>
    ))}
  </NotebookSectionTabs>
)

export const getAssetLayoutOptions = ({
  active,
  locale,
  pathname
}: {
  active: AssetSection
  locale: Locale
  pathname: string
}): Omit<DocsLayoutProps, 'children' | 'shell' | 'tree'> => {
  const options = baseOptions(locale)
  return {
    ...options,
    nav: { ...options.nav, mode: 'top' },
    sidebar: {
      banner: props => (
        <NotebookDrawerHeader
          {...props}
          locale={locale}
          selectedSection={active}
          sections={navigation.map(item => ({
            id: item.id,
            title: item.title,
            url: sectionUrl(locale, item.to)
          }))}
        />
      ),
      footer: props => <NotebookDrawerFooter {...props} />
    },
    containerProps:
      active === 'docs'
        ? undefined
        : {
            className:
              '[--fd-sidebar-col:0px]! [&_[data-sidebar-placeholder]]:hidden'
          },
    tabMode: 'navbar',
    slots: {
      header: props => (
        <NotebookHeader {...props} locale={locale}>
          <AssetNavigation active={active} locale={locale} />
        </NotebookHeader>
      )
    },
    tabs: navigation.map(item => ({
      title: item.title,
      url: sectionUrl(locale, item.to),
      urls: item.id === active ? new Set([pathname]) : undefined
    }))
  }
}

const navigationTree = (locale: Locale): Root => ({
  name: 'Icon library',
  children: [
    { type: 'separator', name: 'Browse' },
    ...navigation.slice(0, 3).map(item => ({
      type: 'page' as const,
      name: item.title,
      url: sectionUrl(locale, item.to)
    })),
    { type: 'separator', name: 'Resources' },
    ...navigation.slice(3).map(item => ({
      type: 'page' as const,
      name: item.title,
      url: sectionUrl(locale, item.to)
    }))
  ]
})

export const AssetShell = ({
  active,
  locale,
  children
}: {
  active: AssetSection
  locale: Locale
  children: ReactNode
}) => {
  const pathname = useRouterState({ select: state => state.location.pathname })
  return (
    <DocsLayout
      {...getAssetLayoutOptions({ active, locale, pathname })}
      shell="notebook"
      tree={navigationTree(locale)}>
      <NotebookPage
        full
        breadcrumb={{ enabled: false }}
        footer={{ enabled: false }}>
        <div className="flex min-w-0 flex-col gap-8">{children}</div>
      </NotebookPage>
    </DocsLayout>
  )
}
