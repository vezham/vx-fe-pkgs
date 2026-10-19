import { createLazyFileRoute } from '@tanstack/react-router'

import HostelListOperationsPage from '@pages/operations/hostel/hostel-list'

export const Route = createLazyFileRoute('/operations/hostel/hostel-list/')({
  component: HostelListOperationsPage
})
