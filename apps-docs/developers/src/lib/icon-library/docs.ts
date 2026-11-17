import { z } from 'zod'

import { defineDocs } from '@vezham/docs-mdx/macro'
import {
  createStaticDocsRuntime,
  docsMetaSchema,
  docsPageSchema
} from '@vezham/start/runtime/docs'

import { vxCore, vxDocs, vxI18n, vxMetadata } from '@generated/vx'

export const iconDocs = defineDocs({
  dir: 'content/docs-assets',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: docsPageSchema.extend({ logo: z.string().optional() })
  },
  meta: { schema: docsMetaSchema }
})
const docsI18n = { ...vxI18n, fallbackLanguage: vxI18n.defaultLanguage }

export const iconDocsRuntime = createStaticDocsRuntime({
  i18n: docsI18n,
  docs: iconDocs,
  docsRoute: '/docs/assets/guides',
  head: {
    appName: vxCore.shortName,
    docsImageRoute: vxDocs.docsImageRoute,
    openGraphImage: new URL(vxMetadata.openGraph.image, vxMetadata.url).href,
    openGraphImageSource: 'url',
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  }
})
const load = iconDocsRuntime.createDocsLoader()
export const loadIconDocs = ({
  params
}: {
  params: { lang?: string; framework?: string }
}) => load({ params: { lang: params.lang, _splat: params.framework ?? '' } })
export type IconDocsLoaderData = Awaited<ReturnType<typeof loadIconDocs>>
