import { notFound, redirect } from '@tanstack/react-router'

import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import {
  getAvailableDocsPackages,
  packagesDocsRuntime
} from '@components/docs/packages-docs'
import { filterSidebarTree } from '@components/docs/sidebar-group/tree'
import {
  docsPackages,
  getDocsPackage,
  getPackageDocsPath
} from '@config/packages'
import { docsPageHead } from '@src/lib/page-head'

import { getContentPage, getContentSections } from './content-navigation'

type Params = { package?: string; _splat?: string; lang?: string }

export const packageDocsIndexRouteOptions = {
  beforeLoad: ({ params }: { params: Params }) => {
    const packageId =
      params.package === undefined
        ? getAvailableDocsPackages(params.lang)[0]
        : getDocsPackage(params.package)
    if (!packageId) throw notFound()
    const page = getContentPage(packagesDocsRuntime.source, '', {
      locale: params.lang,
      prefix: packageId
    })
    if (page === undefined) throw notFound()
    throw redirect({
      to: '/{-$lang}/docs/packages/$package/$',
      params: { lang: params.lang, package: packageId, _splat: page }
    })
  }
}

export const loadPackageDocs = async ({ params }: { params: Params }) => {
  const packageId = getDocsPackage(params.package)
  const page = params._splat
  if (!packageId || !page) throw notFound()

  const data = await packagesDocsRuntime.createDocsLoader()({
    params: { lang: params.lang, _splat: `${packageId}/${page}` }
  })
  const tree = packagesDocsRuntime.source.getPageTree(data.locale)
  const sections = getContentSections(packagesDocsRuntime.source, {
    locale: data.locale,
    prefix: packageId
  }).map(section => ({
    id: section.id,
    title: section.title,
    path: getPackageDocsPath(packageId, section.page)
  }))
  const section = sections.find(item => item.id === page.split('/')[0])
  if (!section) throw notFound()
  const docsBase = localizedUrl(i18n, data.locale, '/docs/packages')
  const nodes = filterSidebarTree({
    docsBase,
    nodes: tree.children,
    prefix: packageId
  })

  return {
    ...data,
    packageId,
    page,
    sections,
    pageTree: await packagesDocsRuntime.source.serializePageTree({
      ...tree,
      $id: `${data.locale}:packages:${packageId}:${section.id}`,
      name: docsPackages[packageId].name,
      children: filterSidebarTree({
        docsBase,
        nodes,
        prefix: `${packageId}/${section.id}`
      }),
      fallback: undefined
    })
  }
}

export const packageDocsRouteOptions = {
  loader: loadPackageDocs,
  head: ({
    loaderData
  }: {
    loaderData?: Awaited<ReturnType<typeof loadPackageDocs>>
  }) =>
    docsPageHead(loaderData, packagesDocsRuntime.getDocsRouteHead(loaderData), {
      section: loaderData ? docsPackages[loaderData.packageId].name : undefined
    })
}

export const packageMarkdownHandler = async ({
  params
}: {
  params: Params
}) => {
  const packageId = getDocsPackage(params.package)
  if (!packageId) return new Response(null, { status: 404 })
  const { page } = packagesDocsRuntime.getDocsPage({
    slugs: [packageId, ...(params._splat?.split('/') ?? [])],
    lang: params.lang,
    pathFormat: 'markdown-url'
  })
  return new Response(await packagesDocsRuntime.getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown' }
  })
}
