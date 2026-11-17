import { createFileRoute } from '@tanstack/react-router'

import { createUiDocsIndexRouteOptions } from '@src/lib/docs/platform-route'

export const Route = createFileRoute('/{-$lang}/docs/ui/react/')(
  createUiDocsIndexRouteOptions('react')
)
