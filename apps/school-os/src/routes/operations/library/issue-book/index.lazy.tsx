import { createLazyFileRoute } from '@tanstack/react-router'

import IssueBookOperationsPage from '@pages/operations/library/issue-book'

export const Route = createLazyFileRoute('/operations/library/issue-book/')({
  component: IssueBookOperationsPage
})
