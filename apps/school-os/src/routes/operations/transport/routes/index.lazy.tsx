import { createLazyFileRoute } from '@tanstack/react-router'

import RoutesOperationsPage from '@pages/operations/transport/routes'

export const Route = createLazyFileRoute('/operations/transport/routes/')({
  component: RoutesOperationsPage
})
