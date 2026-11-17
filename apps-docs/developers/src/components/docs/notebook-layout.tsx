import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import type { DocsLayoutProps } from '@vezham/start/layouts/docs'
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

export const getNotebookLayoutOptions = ({
  locale,
  path,
  title,
  leading,
  secondary,
  sections = [{ title, path }],
  sectionLabel
}: {
  locale: Locale
  path: string
  title: string
  leading?: ReactNode
  secondary?: ReactNode
  sections?: readonly { title: string; path: string }[]
  sectionLabel?: string
}): Omit<DocsLayoutProps, 'children' | 'shell' | 'tree'> => {
  const options = baseOptions(locale)
  const activePath = sections
    .filter(
      section => path === section.path || path.startsWith(`${section.path}/`)
    )
    .sort((a, b) => b.path.length - a.path.length)[0]?.path
  return {
    ...options,
    nav: { ...options.nav, mode: 'top', children: secondary },
    sidebar: {
      banner: props => (
        <NotebookDrawerHeader
          {...props}
          locale={locale}
          secondary={secondary}
          selectedSection={activePath}
          sections={sections.map(section => ({
            id: section.path,
            title: section.title,
            url: localizedUrl(i18n, locale, section.path)
          }))}
        />
      ),
      footer: props => <NotebookDrawerFooter {...props} secondary={secondary} />
    },
    tabMode: 'navbar',
    tabs: sections.map(section => ({
      title: section.title,
      url: localizedUrl(i18n, locale, section.path),
      urls:
        section.path === activePath
          ? new Set([localizedUrl(i18n, locale, path)])
          : undefined
    })),
    slots: {
      header: props => (
        <NotebookHeader {...props} locale={locale} leading={leading}>
          <NotebookSectionTabs label={sectionLabel}>
            {sections.map(section => {
              const selected = section.path === activePath
              return (
                <Link
                  key={section.path}
                  to={localizedUrl(i18n, locale, section.path)}
                  activeOptions={{ exact: true }}
                  aria-current={selected ? 'page' : undefined}
                  className={sectionTabVariants({ selected })}>
                  {section.title}
                </Link>
              )
            })}
          </NotebookSectionTabs>
        </NotebookHeader>
      )
    }
  }
}
