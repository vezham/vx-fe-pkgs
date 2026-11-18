import { useLocation } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import type { Root } from '@vezham/docs-core/page-tree'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle
} from '@vezham/docs-react/layouts/notebook/page'

const pages = [
  {
    path: '',
    title: 'Getting Started',
    description: 'Build a documentation site with the Notebook layout.'
  },
  {
    path: '/guides',
    title: 'Guides',
    description: 'Practical guides for configuring your application.'
  },
  {
    path: '/guides/installation',
    title: 'Installation',
    description: 'Install the package and connect your navigation tree.'
  }
]

export const useNotebookExample = (basePath: string) => {
  const path = useLocation({ select: location => location.pathname })
  const page =
    pages.find(page => `${basePath}${page.path}` === path) ?? pages[0]
  const tree: Root = {
    name: 'Acme Docs',
    children: pages.map(page => ({
      type: 'page',
      name: page.title,
      url: `${basePath}${page.path}`
    }))
  }

  return {
    path,
    page,
    tree,
    sections: [
      { title: 'Getting Started', path: basePath },
      { title: 'Guides', path: `${basePath}/guides` }
    ]
  }
}

export const NotebookExamplePage = ({
  page,
  children
}: {
  page: (typeof pages)[number]
  children?: ReactNode
}) => (
  <DocsPage
    toc={[]}
    footer={{ enabled: false }}
    breadcrumb={{ enabled: false }}
    tableOfContent={{ enabled: false }}
    tableOfContentPopover={{ enabled: false }}>
    <DocsTitle>{page.title}</DocsTitle>
    <DocsDescription>{page.description}</DocsDescription>
    <DocsBody>
      <p>
        Choose a page from the sidebar or switch between Getting Started and
        Guides. The active section follows the current page.
      </p>
      <h2>Responsive navigation</h2>
      <p>
        At a mobile width, open the sidebar to try the section picker. At a
        desktop width, use the tabs and collapse the sidebar.
      </p>
      {children}
    </DocsBody>
  </DocsPage>
)
