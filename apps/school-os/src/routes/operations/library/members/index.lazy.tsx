import { createLazyFileRoute } from '@tanstack/react-router'

import LibraryMembersOperationsPage from '@pages/operations/library/members'

export const Route = createLazyFileRoute('/operations/library/members/')({
  component: LibraryMembersOperationsPage
})
