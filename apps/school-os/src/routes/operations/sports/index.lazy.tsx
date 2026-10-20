import { createLazyFileRoute } from '@tanstack/react-router'

import SportsOperationsPage from '@pages/operations/sports'

export const Route = createLazyFileRoute('/operations/sports/')({
  component: SportsOperationsPage
})
