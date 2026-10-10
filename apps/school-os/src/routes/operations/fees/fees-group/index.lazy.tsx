import { createLazyFileRoute } from '@tanstack/react-router'

import FeesGroupOperationsPage from '@pages/operations/fees/fees-group'

export const Route = createLazyFileRoute('/operations/fees/fees-group/')({
  component: FeesGroupOperationsPage
})
