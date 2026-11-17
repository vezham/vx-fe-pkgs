import { defineDocs } from '@vezham/docs-mdx/macro'
import {
  createStaticDocsRuntime,
  docsMetaSchema,
  docsPageSchema
} from '@vezham/start/runtime/docs'

import { vxCore, vxDocs, vxI18n, vxMetadata } from '@generated/vx'

// vx-bot/NOTE: Handbook and Markdown share one collection, including group metadata for labels and icons.
export const handbookDocs = defineDocs({
  dir: 'content/handbook',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: docsPageSchema
  },
  meta: {
    schema: docsMetaSchema
  }
})

export const handbookDocsRuntime = createStaticDocsRuntime({
  docs: handbookDocs,
  docsRoute: '/handbook',
  i18n: vxI18n,
  head: {
    appName: vxCore.shortName,
    docsImageRoute: vxDocs.docsImageRoute,
    openGraphImage: vxMetadata.openGraph.image,
    openGraphImageSource: vxMetadata.openGraph.imageSource,
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  }
})
