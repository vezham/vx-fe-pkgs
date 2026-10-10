import { createLazyFileRoute } from '@tanstack/react-router'

import VehiclesOperationsPage from '@pages/operations/transport/vehicles'

export const Route = createLazyFileRoute('/operations/transport/vehicles/')({
  component: VehiclesOperationsPage
})
