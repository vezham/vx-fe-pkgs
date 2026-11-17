import { defineDocs } from '@vezham/docs-mdx/macro'
import {
  createStaticDocsRuntime,
  docsMetaSchema,
  docsPageSchema
} from '@vezham/start/runtime/docs'

import { getDocsPackage } from '@config/packages'
import { vxCore, vxDocs, vxI18n, vxMetadata } from '@generated/vx'

export const packagesDocs = defineDocs({
  dir: 'content/docs-packages',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: docsPageSchema
  },
  meta: { schema: docsMetaSchema }
})

const docsI18n = { ...vxI18n, fallbackLanguage: vxI18n.defaultLanguage }

export const packagesDocsRuntime = createStaticDocsRuntime({
  docs: packagesDocs,
  docsRoute: '/docs/packages',
  i18n: docsI18n,
  head: {
    appName: vxCore.shortName,
    docsImageRoute: vxDocs.docsImageRoute,
    openGraphImage: vxMetadata.openGraph.image,
    openGraphImageSource: vxMetadata.openGraph.imageSource,
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  }
})

export const getAvailableDocsPackages = (locale?: string) =>
  packagesDocsRuntime.source.getPageTree(locale).children.flatMap(node => {
    if (node.type !== 'folder') return []
    const id = getDocsPackage(
      packagesDocsRuntime.source.getNodeMeta(node, locale)?.path.split('/')[0]
    )
    return id ? [id] : []
  })
