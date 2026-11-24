import { createFileRoute } from '@tanstack/react-router'

import { UiDocsPage } from '@components/docs/ui-docs-page'
import { createPlatformDocsRouteOptions } from '@src/lib/docs/platform-route'

const RouteComponent = () => (
  <UiDocsPage
    library="auth"
    data={Route.useLoaderData()}
    params={Route.useParams()}
  />
)

export const Route = createFileRoute('/{-$lang}/docs/ui/auth/$platform/$')({
  ...createPlatformDocsRouteOptions('auth'),
  component: RouteComponent
})
