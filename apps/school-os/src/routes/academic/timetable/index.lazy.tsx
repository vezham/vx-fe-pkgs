import { createLazyFileRoute } from '@tanstack/react-router'

import TimeTablePage from '@pages/academic/timetable'

export const Route = createLazyFileRoute('/academic/timetable/')({
  component: TimeTablePage
})
