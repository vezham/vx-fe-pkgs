import { createFileRoute, redirect } from '@tanstack/react-router'

import NavigationDemoContent from '@pages/navigation-demo/content'
import {
  getDefaultDestination,
  getNavigationPage
} from '@pages/navigation-demo/navigation'

export const Route = createFileRoute('/academic/$')({
  beforeLoad: ({ location }) => {
    const { page } = getNavigationPage('academic', location.pathname)
    if (page.children?.length)
      throw redirect({ to: getDefaultDestination(page), replace: true })
  },
  component: NavigationDemoContent
})
