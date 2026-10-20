import { createLazyFileRoute } from '@tanstack/react-router'

import BooksOperationsPage from '@pages/operations/library/books'

export const Route = createLazyFileRoute('/operations/library/books/')({
  component: BooksOperationsPage
})
