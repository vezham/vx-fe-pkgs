import { createLazyFileRoute } from '@tanstack/react-router'

import AllClassesPage from '@pages/academic/classes/all-classes'

export const Route = createLazyFileRoute('/academic/classes/allclasses/')({
  component: AllClassesPage
})
