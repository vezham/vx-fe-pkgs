import { createFileRoute } from '@tanstack/react-router'

import { packageMarkdownHandler } from '@src/lib/docs/package-route'

export const Route = createFileRoute('/{-$lang}/docs/packages/$package/{$}.md')(
  {
    server: { handlers: { GET: packageMarkdownHandler } }
  }
)
