import { notFound, redirect } from '@tanstack/react-router'

import { getUiLibraryRoute } from '@components/docs/library-routes'
import {
  getAvailablePlatforms,
  getPlatformDocsRuntime
} from '@components/docs/platform-docs'
import { getPlatformPage } from '@components/docs/platform-sections'
import { type UiLibrary, getUiLibrarySectionTitle } from '@config/ui-libraries'
import { docsPageHead } from '@src/lib/page-head'

import { createPlatformDocsLoader } from './platform-loader'

type PlatformDocsData = Awaited<
  ReturnType<ReturnType<typeof createPlatformDocsLoader>>
>
type PlatformParams = { platform: string; _splat?: string; lang?: string }

export const createUiDocsIndexRouteOptions = (
  library: UiLibrary = 'react'
) => ({
  beforeLoad: ({
    params
  }: {
    params: { lang?: string; platform?: string }
  }) => {
    const platform = params.platform ?? getAvailablePlatforms(library)[0]
    if (platform !== 'web' && platform !== 'native') throw notFound()
    if (!getAvailablePlatforms(library).includes(platform)) throw notFound()
    throw redirect({
      to: getUiLibraryRoute(library),
      params: {
        lang: params.lang,
        platform,
        _splat: getPlatformPage(platform, '', library, params.lang)
      }
    })
  }
})

export const createPlatformDocsRouteOptions = (library: UiLibrary) => ({
  head: ({
    loaderData,
    params
  }: {
    loaderData?: PlatformDocsData
    params: { platform?: string }
  }) => {
    const head = docsPageHead(
      loaderData,
      getPlatformDocsRuntime(
        params.platform === 'native' ? 'native' : 'web',
        library
      ).getDocsRouteHead(loaderData),
      {
        section: getUiLibrarySectionTitle(
          library,
          params.platform === 'native' ? 'native' : 'web'
        )
      }
    )
    if (!loaderData?.image || !head.meta) return head
    return {
      ...head,
      meta: head.meta.map(meta =>
        ('property' in meta && meta.property === 'og:image') ||
        ('name' in meta && meta.name === 'twitter:image')
          ? { ...meta, content: loaderData.image }
          : meta
      )
    }
  },
  loader: createPlatformDocsLoader(library)
})

export const createPlatformMarkdownHandler =
  (library: UiLibrary) =>
  async ({ params }: { params: PlatformParams }) => {
    if (params.platform !== 'web' && params.platform !== 'native')
      return new Response(null, { status: 404 })
    const runtime = getPlatformDocsRuntime(params.platform, library)
    const { page } = runtime.getDocsPage({
      slugs: params._splat?.split('/') ?? [],
      lang: params.lang,
      pathFormat: 'markdown-url'
    })
    return new Response(await runtime.getLLMText(page), {
      headers: { 'Content-Type': 'text/markdown' }
    })
  }
