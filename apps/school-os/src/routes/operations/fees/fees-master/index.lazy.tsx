import { createLazyFileRoute } from '@tanstack/react-router'

import FeesMasterOperationsPage from '@pages/operations/fees/fees-master'

export const Route = createLazyFileRoute('/operations/fees/fees-master/')({
  component: FeesMasterOperationsPage
})
