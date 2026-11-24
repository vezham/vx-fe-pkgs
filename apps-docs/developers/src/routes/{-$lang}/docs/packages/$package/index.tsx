import { createFileRoute } from '@tanstack/react-router'

import { packageDocsIndexRouteOptions } from '@src/lib/docs/package-route'

export const Route = createFileRoute('/{-$lang}/docs/packages/$package/')({
  ...packageDocsIndexRouteOptions
})
