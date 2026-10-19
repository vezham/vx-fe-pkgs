import { createLazyFileRoute } from '@tanstack/react-router'

import RoomTypeOperationsPage from '@pages/operations/hostel/room-type'

export const Route = createLazyFileRoute('/operations/hostel/room-type/')({
  component: RoomTypeOperationsPage
})
