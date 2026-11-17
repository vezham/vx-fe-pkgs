import { Link } from '@tanstack/react-router'
import { Suspense, use } from 'react'

import { useDocsLoader } from '@vezham/docs-core/source/client'
import { Chip } from '@vezham/react-v3'
import { DocsLayout, DocsPage } from '@vezham/start/layouts/docs'
import { getMDXComponents } from '@vezham/start/mdx'
import type { DocsRoutePageProps } from '@vezham/start/pages/docs/route'

import { ComponentLinks } from './component-links'
import { PageMetadata } from './page-metadata'
import type { getPlatformDocs } from './platform-docs'

type Props = Omit<DocsRoutePageProps, 'docs'> & {
  docs: ReturnType<typeof getPlatformDocs>
  platform: 'web' | 'native'
}

const components = getMDXComponents()

const Content = ({
  docs,
  path,
  markdownUrl,
  platform,
  shell
}: Pick<Props, 'docs' | 'shell'> & {
  path: string
  markdownUrl: string
  platform: 'web' | 'native'
}) => {
  const page = docs.getPage(path)
  if (!page) throw new Error(`Unknown platform docs page: ${path}`)
  const { toc } = use(page.load())
  const MDX = page.body
  return (
    <DocsPage
      title={
        <span className="inline-flex flex-wrap items-center gap-2">
          {page.title}
          {page.status && (
            <Chip
              size="sm"
              variant="soft"
              color={page.status === 'new' ? 'accent' : 'default'}>
              <Chip.Label>
                {page.status === 'new-dot'
                  ? 'New'
                  : `${page.status[0].toUpperCase()}${page.status.slice(1)}`}
              </Chip.Label>
            </Chip>
          )}
        </span>
      }
      description={page.description}
      markdownUrl={markdownUrl}
      shell={shell}
      toc={toc}>
      <ComponentLinks links={page.links} sourceUrl={page.sourceUrl} />
      <PageMetadata
        value={{
          platform,
          github: page.github
        }}>
        <MDX components={components} />
      </PageMetadata>
    </DocsPage>
  )
}

export const PlatformDocsRoutePage = ({
  data,
  docs,
  platform,
  getLayoutOptions,
  shell = 'notebook'
}: Props) => {
  const page = useDocsLoader(data)
  return (
    <DocsLayout
      {...getLayoutOptions(page.locale)}
      shell={shell}
      tree={page.pageTree}>
      <Link to={page.markdownUrl} hidden />
      <Suspense>
        <Content
          docs={docs}
          platform={platform}
          path={page.path}
          markdownUrl={page.markdownUrl}
          shell={shell}
        />
      </Suspense>
    </DocsLayout>
  )
}
