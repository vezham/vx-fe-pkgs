import type { ComponentProps, ReactNode } from 'react'

import { DocsLayout as DocsLayoutPrimitive } from '@vezham/docs-react/layouts/docs'
import { DocsLayout as NotebookLayoutPrimitive } from '@vezham/docs-react/layouts/notebook'

import type { DocsPageToc } from './pages'

export type DocsShell = 'docs' | 'flux' | 'glass' | 'home' | 'notebook'

export type DocsLayoutProps = {
  children: ReactNode
  shell?: DocsShell
} & Omit<
  ComponentProps<typeof DocsLayoutPrimitive>,
  'children' | 'sidebar' | 'tabs' | 'tabMode'
> &
  Omit<
    ComponentProps<typeof NotebookLayoutPrimitive>,
    'children' | 'tabs' | 'tabMode'
  > &
  Pick<ComponentProps<typeof NotebookLayoutPrimitive>, 'tabs'> & {
    tabMode?:
      | ComponentProps<typeof DocsLayoutPrimitive>['tabMode']
      | ComponentProps<typeof NotebookLayoutPrimitive>['tabMode']
  }

export type DocsPageProps = {
  children: ReactNode
  description?: ReactNode
  full?: boolean
  markdownUrl?: string
  shell?: DocsShell
  title?: ReactNode
  toc: DocsPageToc
}
