import { createFileRoute } from '@tanstack/react-router'

import { getDocsLLMSIndex } from '@vezham/start/runtime/docs'

import { docsRuntimes } from '@src/lib/docs/runtimes'

export const Route = createFileRoute('/(llms)/llms.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(
          docsRuntimes
            .map(runtime => runtime.source)
            .map(getDocsLLMSIndex)
            .join('\n\n')
        )
    }
  }
})
