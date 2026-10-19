import { createLazyFileRoute } from '@tanstack/react-router'

import SyllabusPage from '@pages/academic/syllabus/[id]'

export const Route = createLazyFileRoute('/academic/syllabus/$id/')({
  component: SyllabusPage
})
