import { createLazyFileRoute } from '@tanstack/react-router'

import PickupPointsOperationsPage from '@pages/operations/transport/pickup-points'

export const Route = createLazyFileRoute(
  '/operations/transport/pickup-points/'
)({
  component: PickupPointsOperationsPage
})
