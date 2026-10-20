import { createLazyFileRoute } from '@tanstack/react-router'

import ReturnBooksOperationsPage from '@pages/operations/library/return'

export const Route = createLazyFileRoute('/operations/library/return/')({
  component: ReturnBooksOperationsPage
})
