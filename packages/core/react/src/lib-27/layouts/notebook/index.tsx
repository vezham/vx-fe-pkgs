import type { ComponentProps } from 'react'

import { DocsLayout } from '@vezham/docs-react/layouts/notebook'

import { NotebookDrawerFooter, NotebookDrawerHeader } from './drawer'
import { NotebookHeader } from './header'
import { getLayoutOptions } from './layout'
import { NotebookSectionTabs } from './section-tabs'

export type NotebookProps = ComponentProps<typeof DocsLayout>

const NotebookRoot = (props: NotebookProps) => <DocsLayout {...props} />

export const Notebook = Object.assign(NotebookRoot, {
  Drawer: {
    Footer: NotebookDrawerFooter,
    Header: NotebookDrawerHeader
  },
  Header: NotebookHeader,
  SectionTabs: NotebookSectionTabs,
  getLayoutOptions
})

export type {
  NotebookDrawerFooterProps,
  NotebookDrawerHeaderProps,
  NotebookSection
} from './drawer'
export type { NotebookHeaderProps } from './header'
export type {
  NotebookLayoutConfig,
  NotebookLayoutOptions,
  NotebookLayoutProps
} from './layout'
export type { NotebookSectionTabsProps } from './section-tabs'
export { notebookSectionTabVariants } from './variants'
