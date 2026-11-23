'use client'

import { LastUsedBadge } from './last-used-badge'
import { lastLoginMethodPlugin } from './plugin'

export type * from './plugin'
export type * from './last-used-badge'

export const LastLoginMethod = {
  plugin: lastLoginMethodPlugin,
  Badge: LastUsedBadge
}
