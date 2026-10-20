import { createLazyFileRoute } from '@tanstack/react-router'

import SubjectPage from '@pages/academic/subject'

export const Route = createLazyFileRoute('/academic/subject/')({
  component: SubjectPage
})
