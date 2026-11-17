import { createFileRoute } from '@tanstack/react-router'

import { HandbookDocsPage } from '@components/docs/handbook-docs-page'
import { handbookDocsRouteOptions } from '@src/lib/docs/handbook-route'

const RouteComponent = () => <HandbookDocsPage data={Route.useLoaderData()} />

export const Route = createFileRoute('/{-$lang}/handbook/$')({
  ...handbookDocsRouteOptions,
  component: RouteComponent
})
