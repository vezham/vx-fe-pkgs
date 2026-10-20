import { createLazyFileRoute } from '@tanstack/react-router'

import AssignVehicleOperationsPage from '@pages/operations/transport/assign'

export const Route = createLazyFileRoute('/operations/transport/assign/')({
  component: AssignVehicleOperationsPage
})
