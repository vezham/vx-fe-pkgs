import { useRouterState } from '@tanstack/react-router'
import { Suspense, use } from 'react'

import { useDocsLoader } from '@vezham/docs-core/source/client'
import { DocsLayout, DocsPage } from '@vezham/start/layouts/docs'
import { getMDXComponents } from '@vezham/start/mdx'

import { InstallTabs } from '@components/docs/install-tabs'
import type { Locale } from '@generated/vx'
import { assetUrl } from '@src/lib/icon-library/catalog'
import { type IconDocsLoaderData, iconDocs } from '@src/lib/icon-library/docs'

import { getAssetLayoutOptions } from './shell'

const mdxComponents = getMDXComponents({ InstallTabs })
const Content = ({
  path,
  markdownUrl
}: {
  path: string
  markdownUrl: string
}) => {
  const page = iconDocs.getPage(path)
  if (!page) throw new Error('Unknown icon guide')
  const { toc } = use(page.load())
  const MDX = page.body
  return (
    <DocsPage
      title={
        page.logo ? (
          <span className="inline-flex items-center gap-3">
            <img
              src={assetUrl('logos', { slug: page.logo, variants: {} })}
              alt=""
              width={24}
              height={24}
              className={`block shrink-0 rounded-none object-contain ${page.logo === 'mcp-model-context-protocol' ? 'dark:invert' : ''}`}
            />
            <span>{page.title}</span>
          </span>
        ) : (
          page.title
        )
      }
      description={page.description}
      toc={toc}
      markdownUrl={markdownUrl}
      shell="notebook">
      <MDX components={mdxComponents} />
    </DocsPage>
  )
}
export const IconDocsPage = ({ data }: { data: IconDocsLoaderData }) => {
  const page = useDocsLoader(data)
  const pathname = useRouterState({ select: state => state.location.pathname })
  return (
    <DocsLayout
      {...getAssetLayoutOptions({
        active: 'docs',
        locale: page.locale as Locale,
        pathname
      })}
      tree={page.pageTree}
      shell="notebook">
      <a href={page.markdownUrl} hidden>
        Markdown
      </a>
      <Suspense>
        <Content path={page.path} markdownUrl={page.markdownUrl} />
      </Suspense>
    </DocsLayout>
  )
}
