import { createLazyFileRoute } from '@tanstack/react-router'

import CollectFeesOperationsPage from '@pages/operations/fees/collect-fees'

export const Route = createLazyFileRoute('/operations/fees/collect-fees/')({
  component: CollectFeesOperationsPage
})
