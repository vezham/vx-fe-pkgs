import { createLazyFileRoute } from '@tanstack/react-router'

import SubjectPage from '@pages/academic/subject/[id]'

export const Route = createLazyFileRoute('/academic/subject/$id/')({
  component: SubjectPage
})
