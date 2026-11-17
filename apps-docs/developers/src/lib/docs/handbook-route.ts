import { decodeMarkdownUrl, localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { handbookDocsRuntime } from '@components/docs/handbook-docs'
import { createSidebarGroups } from '@components/docs/sidebar-group/tree'
import { docsPageHead } from '@src/lib/page-head'

import handbookMeta from '../../../content/handbook/meta.json'
import { getContentSections } from './content-navigation'

export const loadHandbookDocs = async ({
  params
}: {
  params: { lang?: string; _splat?: string }
}) => {
  const data = await handbookDocsRuntime.createDocsLoader()({ params })
  const page = params._splat ?? ''
  const sections = getContentSections(handbookDocsRuntime.source, {
    locale: data.locale
  })
  const section = sections.find(item => item.id === page.split('/')[0])
  const tree = handbookDocsRuntime.source.getPageTree(data.locale)
  return {
    ...data,
    page,
    sections,
    section,
    collectionTitle: handbookMeta.title,
    pageTree: await handbookDocsRuntime.source.serializePageTree({
      ...tree,
      $id: `${data.locale}:handbook:${section?.id || 'index'}`,
      name: section?.title ?? tree.name,
      children: createSidebarGroups({
        docsBase: localizedUrl(i18n, data.locale, '/handbook'),
        nodes: tree.children,
        prefix: section?.id ?? ''
      }),
      fallback: undefined
    })
  }
}

type Data = Awaited<ReturnType<typeof loadHandbookDocs>>

export const handbookDocsRouteOptions = {
  loader: loadHandbookDocs,
  head: ({ loaderData: data }: { loaderData?: Data }) =>
    docsPageHead(data, handbookDocsRuntime.getDocsRouteHead(data), {
      title:
        data?.page && data.page === data.section?.page
          ? data.section.title
          : undefined,
      section: !data?.page
        ? undefined
        : data.page === data.section?.page || !data.section?.page
          ? data.collectionTitle
          : data.section.title
    })
}

export const handbookMarkdownHandler = async ({
  params
}: {
  params: { lang?: string; _splat?: string }
}) => {
  const slugs = decodeMarkdownUrl(params._splat?.split('/') ?? [])
  if (slugs[slugs.length - 1] === 'index') slugs.pop()
  const { page } = handbookDocsRuntime.getDocsPage({ slugs, lang: params.lang })
  return new Response(await handbookDocsRuntime.getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown' }
  })
}
