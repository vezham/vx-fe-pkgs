import { createFileRoute } from '@tanstack/react-router'

import { iconDocsRuntime } from '@src/lib/icon-library/docs'

export const Route = createFileRoute(
  '/{-$lang}/docs/assets/guides/{$framework}.md'
)({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { page } = iconDocsRuntime.getDocsPage({
          slugs: params.framework === 'index' ? [] : [params.framework],
          lang: params.lang
        })
        return new Response(await iconDocsRuntime.getLLMText(page), {
          headers: { 'Content-Type': 'text/markdown' }
        })
      }
    }
  }
})
