import { createFileRoute } from '@tanstack/react-router'

import type { StructuredData } from '@vezham/docs-core/mdx-plugins/remark-structure'
import { createI18nSearchAPI } from '@vezham/docs-core/search/server'

import { i18n } from '@app/docs'
import { docsRuntimes } from '@src/lib/docs/runtimes'

const compactSearchData = (data: StructuredData): StructuredData => {
  const sections = new Map<string | undefined, string[]>()
  for (const { heading, content } of data.contents) {
    const text = sections.get(heading) ?? []
    text.push(content)
    sections.set(heading, text)
  }
  return {
    ...data,
    contents: Array.from(sections, ([heading, text]) => ({
      heading,
      content: text.join('\n')
    }))
  }
}

const sources = docsRuntimes.map(runtime => runtime.source)
const createServer = () =>
  createI18nSearchAPI('advanced', {
    i18n,
    indexes: async () =>
      Promise.all(
        sources
          .flatMap(item => item.getPages())
          .map(async page => ({
            id: page.url,
            title: page.data.title,
            description: page.data.description,
            url: page.url,
            locale: page.locale ?? i18n.defaultLanguage,
            structuredData: compactSearchData(
              (await page.data.load()).structuredData
            )
          }))
      )
  })

// vx-bot/NOTE: Index MDX on request so importing the route does not load every page.
let server: ReturnType<typeof createServer> | undefined

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      GET: async () => {
        server ??= createServer()
        return server.staticGET()
      }
    }
  }
})
