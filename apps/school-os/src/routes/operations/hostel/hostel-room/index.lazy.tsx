import { createLazyFileRoute } from '@tanstack/react-router'

import HostelRoomOperationsPage from '@pages/operations/hostel/hostel-room'

export const Route = createLazyFileRoute('/operations/hostel/hostel-room/')({
  component: HostelRoomOperationsPage
})
