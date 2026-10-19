import type { AppNavigationItem } from '@vx/react'

import { getNavigationChildren } from '@generated/navigation'

export const reportsSidebarItems: AppNavigationItem[] =
  getNavigationChildren('reports')
