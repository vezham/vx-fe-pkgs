import { z } from 'zod'

import { defineDocs } from '@vezham/docs-mdx/macro'
import {
  createStaticDocsRuntime,
  docsMetaSchema,
  docsPageSchema
} from '@vezham/start/runtime/docs'

import { type UiLibrary, uiLibraries } from '@config/ui-libraries'
import { vxCore, vxDocs, vxI18n, vxMetadata } from '@generated/vx'

import { componentLinksSchema } from '../../lib/docs/component-resources'

export const platformDocsPageSchema = docsPageSchema.extend({
  links: componentLinksSchema.optional(),
  status: z.enum(['new', 'updated', 'preview', 'new-dot']).optional(),
  image: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  github: z.object({ pull: z.number().optional() }).optional(),
  index: z.boolean().optional()
})

const webPlatformDocs = defineDocs({
  dir: 'content/docs-react-v3/web',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: platformDocsPageSchema
  },
  meta: {
    schema: docsMetaSchema
  }
})

const nativePlatformDocs = defineDocs({
  dir: 'content/docs-react-v3/native',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: platformDocsPageSchema
  },
  meta: {
    schema: docsMetaSchema
  }
})

const proPlatformDocs = defineDocs({
  dir: 'content/docs-react-pro-v3/web',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: platformDocsPageSchema
  },
  meta: { schema: docsMetaSchema }
})

const nativeProPlatformDocs = defineDocs({
  dir: 'content/docs-react-pro-v3/native',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: platformDocsPageSchema
  },
  meta: { schema: docsMetaSchema }
})

const reactPlatformDocs = defineDocs({
  dir: 'content/docs-react/web',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: platformDocsPageSchema
  },
  meta: { schema: docsMetaSchema }
})

const nativeReactPlatformDocs = defineDocs({
  dir: 'content/docs-react/native',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true },
    schema: platformDocsPageSchema
  },
  meta: { schema: docsMetaSchema }
})

const runtimeOptions = {
  i18n: { ...vxI18n, fallbackLanguage: vxI18n.defaultLanguage },
  head: {
    appName: vxCore.shortName,
    docsImageRoute: vxDocs.docsImageRoute,
    openGraphImage: new URL(vxMetadata.openGraph.image, vxMetadata.url).href,
    openGraphImageSource: 'url' as const,
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  }
}

const runtimes = {
  web: createStaticDocsRuntime({
    ...runtimeOptions,
    docs: webPlatformDocs,
    docsRoute: `${uiLibraries['react-v3'].routeBase}/web`
  }),
  native: createStaticDocsRuntime({
    ...runtimeOptions,
    docs: nativePlatformDocs,
    docsRoute: `${uiLibraries['react-v3'].routeBase}/native`
  })
}

const proWebRuntime = createStaticDocsRuntime({
  ...runtimeOptions,
  docs: proPlatformDocs,
  docsRoute: `${uiLibraries['react-pro-v3'].routeBase}/web`
})

const libraryRuntimes: Record<UiLibrary, typeof runtimes> = {
  'react-v3': runtimes,
  'react-pro-v3': {
    web: proWebRuntime,
    native: createStaticDocsRuntime({
      ...runtimeOptions,
      docs: nativeProPlatformDocs,
      docsRoute: `${uiLibraries['react-pro-v3'].routeBase}/native`
    })
  },
  react: {
    web: createStaticDocsRuntime({
      ...runtimeOptions,
      docs: reactPlatformDocs,
      docsRoute: `${uiLibraries['react'].routeBase}/web`
    }),
    native: createStaticDocsRuntime({
      ...runtimeOptions,
      docs: nativeReactPlatformDocs,
      docsRoute: `${uiLibraries['react'].routeBase}/native`
    })
  }
}

export const getAvailablePlatforms = (library: UiLibrary) =>
  (['web', 'native'] as const).filter(
    platform =>
      (libraryRuntimes[library][platform]?.source.getPages().length ?? 0) > 0
  )

export const getPlatformDocsRuntime = (
  platform: 'web' | 'native',
  library: UiLibrary = 'react'
) => {
  return libraryRuntimes[library][platform]
}

export const getPlatformDocs = (
  platform: 'web' | 'native',
  library: UiLibrary = 'react'
) => {
  if (library === 'react-pro-v3')
    return platform === 'native' ? nativeProPlatformDocs : proPlatformDocs
  if (library === 'react')
    return platform === 'native' ? nativeReactPlatformDocs : reactPlatformDocs
  return platform === 'web' ? webPlatformDocs : nativePlatformDocs
}
