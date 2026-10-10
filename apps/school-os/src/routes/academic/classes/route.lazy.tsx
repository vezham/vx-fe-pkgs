import { createLazyFileRoute } from '@tanstack/react-router'

import ClassesLayoutPage from '@pages/academic/classes/layout'

export const Route = createLazyFileRoute('/academic/classes')({
  component: ClassesLayoutPage
})
