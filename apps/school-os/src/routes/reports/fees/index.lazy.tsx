import { createLazyFileRoute } from '@tanstack/react-router'

import FeesReportsPage from '@pages/reports/fees'

export const Route = createLazyFileRoute('/reports/fees/')({
  component: FeesReportsPage
})
