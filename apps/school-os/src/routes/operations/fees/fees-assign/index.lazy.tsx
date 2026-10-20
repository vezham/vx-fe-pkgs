import { createLazyFileRoute } from '@tanstack/react-router'

import FeesAssignOperationsPage from '@pages/operations/fees/fees-assign'

export const Route = createLazyFileRoute('/operations/fees/fees-assign/')({
  component: FeesAssignOperationsPage
})
