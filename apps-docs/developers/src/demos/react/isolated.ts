import type { ComponentType } from 'react'

import { authFrames } from './auth'
import { layoutDemos } from './layouts'

export const isolatedDemos: Record<
  string,
  { title: string; loader: () => Promise<ComponentType>; search?: string }
> = { ...layoutDemos, ...authFrames }
