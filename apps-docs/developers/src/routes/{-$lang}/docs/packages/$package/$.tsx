import { createFileRoute } from '@tanstack/react-router'

import { PackageDocsPage } from '@components/docs/package-docs-page'
import { packageDocsRouteOptions } from '@src/lib/docs/package-route'

const RouteComponent = () => <PackageDocsPage data={Route.useLoaderData()} />

export const Route = createFileRoute('/{-$lang}/docs/packages/$package/$')({
  ...packageDocsRouteOptions,
  component: RouteComponent
})
