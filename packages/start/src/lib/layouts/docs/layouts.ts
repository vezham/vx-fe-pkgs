import type { ReactNode } from 'react'

import {
  FluxDocsLayout,
  GlassDocsLayout,
  HomeDocsLayout,
  NotebookDocsLayout,
  StandardDocsLayout
} from './layout-components'
import type { DocsLayoutProps, DocsShell } from './types'

type Props = Omit<DocsLayoutProps, 'shell'>

export const layouts: Record<DocsShell, (props: Props) => ReactNode> = {
  docs: StandardDocsLayout,
  flux: FluxDocsLayout,
  glass: GlassDocsLayout,
  home: HomeDocsLayout,
  notebook: NotebookDocsLayout
}
