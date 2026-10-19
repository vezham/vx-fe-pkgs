import { createLazyFileRoute } from '@tanstack/react-router'

import VehicleDriversOperationsPage from '@pages/operations/transport/vehicle-drivers'

export const Route = createLazyFileRoute(
  '/operations/transport/vehicle-drivers/'
)({
  component: VehicleDriversOperationsPage
})
