import { createLazyFileRoute } from '@tanstack/react-router'

import AllClassesPage from '@pages/academic/classes/all-classes/[id]'

export const Route = createLazyFileRoute('/academic/classes/allclasses/$id/')({
  component: AllClassesPage
})
