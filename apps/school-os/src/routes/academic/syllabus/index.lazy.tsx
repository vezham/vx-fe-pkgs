import { createLazyFileRoute } from '@tanstack/react-router'

import SyllabusPage from '@pages/academic/syllabus'

export const Route = createLazyFileRoute('/academic/syllabus/')({
  component: SyllabusPage
})
