import { createFileRoute } from '@tanstack/react-router'

import { createPlatformMarkdownHandler } from '@src/lib/docs/platform-route'

export const Route = createFileRoute('/{-$lang}/docs/ui/auth/$platform/{$}.md')(
  {
    server: { handlers: { GET: createPlatformMarkdownHandler('auth') } }
  }
)
