import { Link } from '@tanstack/react-router'
import type { ComponentProps, ReactNode } from 'react'

import { DocsLayout } from '@vezham/docs-react/layouts/notebook'

import {
  NotebookDrawerFooter,
  type NotebookDrawerFooterProps,
  NotebookDrawerHeader,
  type NotebookDrawerHeaderProps
} from './drawer'
import { NotebookHeader, type NotebookHeaderProps } from './header'
import { NotebookSectionTabs } from './section-tabs'
import { notebookSectionTabVariants } from './variants'

export type NotebookLayoutProps = Omit<
  ComponentProps<typeof DocsLayout>,
  'children' | 'tree'
>

export type NotebookLayoutConfig = {
  baseOptions?: NotebookLayoutProps
  resolveUrl?: (path: string) => string
  headerProps?: Omit<NotebookHeaderProps, 'children' | 'leading'>
  drawerHeaderProps?: Omit<
    NotebookDrawerHeaderProps,
    'sections' | 'selectedSection' | 'secondary'
  >
  drawerFooterProps?: Omit<NotebookDrawerFooterProps, 'secondary'>
}

export type NotebookLayoutOptions = NotebookLayoutConfig & {
  path: string
  title: string
  leading?: ReactNode
  secondary?: ReactNode
  sections?: readonly { title: string; path: string }[]
  sectionLabel?: string
}

export const getLayoutOptions = ({
  baseOptions = {},
  resolveUrl = path => path,
  headerProps,
  drawerHeaderProps,
  drawerFooterProps,
  path,
  title,
  leading,
  secondary,
  sections = [{ title, path }],
  sectionLabel
}: NotebookLayoutOptions): NotebookLayoutProps => {
  const options = baseOptions
  const activePath = sections
    .filter(
      section => path === section.path || path.startsWith(`${section.path}/`)
    )
    .sort((a, b) => b.path.length - a.path.length)[0]?.path
  return {
    ...options,
    nav: { ...options.nav, mode: 'top', children: secondary },
    sidebar: {
      ...options.sidebar,
      banner: props => (
        <NotebookDrawerHeader
          {...props}
          {...drawerHeaderProps}
          secondary={secondary}
          selectedSection={activePath}
          sections={sections.map(section => ({
            id: section.path,
            title: section.title,
            url: resolveUrl(section.path)
          }))}
        />
      ),
      footer: props => (
        <NotebookDrawerFooter
          {...props}
          {...drawerFooterProps}
          secondary={secondary}
        />
      )
    },
    tabMode: 'navbar',
    tabs: sections.map(section => ({
      title: section.title,
      url: resolveUrl(section.path),
      urls:
        section.path === activePath ? new Set([resolveUrl(path)]) : undefined
    })),
    slots: {
      ...options.slots,
      header: props => (
        <NotebookHeader {...props} {...headerProps} leading={leading}>
          <NotebookSectionTabs label={sectionLabel}>
            {sections.map(section => {
              const selected = section.path === activePath
              return (
                <Link
                  key={section.path}
                  to={resolveUrl(section.path)}
                  activeOptions={{ exact: true }}
                  aria-current={selected ? 'page' : undefined}
                  className={notebookSectionTabVariants({ selected })}>
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
