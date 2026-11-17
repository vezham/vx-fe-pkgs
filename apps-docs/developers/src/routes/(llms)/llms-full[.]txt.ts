import { createFileRoute } from '@tanstack/react-router'

import { docsRuntimes } from '@src/lib/docs/runtimes'

export const Route = createFileRoute('/(llms)/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        const scanned = await Promise.all(
          docsRuntimes.flatMap(runtime =>
            runtime.source.getPages().map(runtime.getLLMText)
          )
        )

        return new Response(scanned.join('\n\n'))
      }
    }
  }
})
