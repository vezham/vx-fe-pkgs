import { createLazyFileRoute } from '@tanstack/react-router'

import FeesTypeOperationsPage from '@pages/operations/fees/fees-type'

export const Route = createLazyFileRoute('/operations/fees/fees-type/')({
  component: FeesTypeOperationsPage
})
