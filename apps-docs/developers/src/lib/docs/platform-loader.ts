import { notFound } from '@tanstack/react-router'

import { SidebarGroup } from '@vezham/react/components/sidebar-group'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import {
  getAvailablePlatforms,
  getPlatformDocsRuntime
} from '@components/docs/platform-docs'
import { getPlatformSections } from '@components/docs/platform-sections'
import { type UiLibrary, uiLibraries } from '@config/ui-libraries'

import { resolveDocsIcon } from './icons'

type Params = {
  _splat?: string
  lang?: string
  platform?: string
}

export const createPlatformDocsLoader =
  (library: UiLibrary = 'react') =>
  async ({ params }: { params: Params }) => {
    if (params.platform !== 'web' && params.platform !== 'native')
      throw notFound()

    const platforms = getAvailablePlatforms(library)
    if (!platforms.includes(params.platform)) throw notFound()

    const runtime = getPlatformDocsRuntime(params.platform, library)
    const data = await runtime.createDocsLoader()({ params })
    const sectionId = params._splat?.split('/')[0]
    const section = getPlatformSections(
      params.platform,
      library,
      data.locale
    ).find(item => item.id === sectionId)
    if (!section) throw notFound()

    const { page } = runtime.getDocsPage({
      slugs: params._splat?.split('/').filter(Boolean) ?? [],
      lang: data.locale
    })
    const routeBase = `${uiLibraries[library].routeBase}/${params.platform}`
    const tree = runtime.source.getPageTree(data.locale)
    return {
      ...data,
      platforms,
      image: page.data.image,
      pageTree: await runtime.source.serializePageTree({
        ...tree,
        $id: `${data.locale}:${routeBase}:${section.id}`,
        name: section.title,
        children: SidebarGroup.createGroups({
          resolveIcon: resolveDocsIcon,
          docsBase: localizedUrl(i18n, data.locale, routeBase),
          nodes: tree.children,
          prefix: section.prefix
        }),
        fallback: undefined
      })
    }
  }
