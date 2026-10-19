import { createLazyFileRoute } from '@tanstack/react-router'

import OperationsLayoutPage from '@pages/operations/layout'

export const Route = createLazyFileRoute('/operations')({
  component: OperationsLayoutPage
})
