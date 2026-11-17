import { createFileRoute } from '@tanstack/react-router'

import { handbookMarkdownHandler } from '@src/lib/docs/handbook-route'

export const Route = createFileRoute('/{-$lang}/handbook/{$}.md')({
  server: { handlers: { GET: handbookMarkdownHandler } }
})
