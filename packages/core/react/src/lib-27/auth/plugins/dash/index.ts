'use client'

import { AdminActivity } from './activity'
import { AdminUserActivity } from './activity'
import { UserActivity } from './activity'
import { OrganizationActivity } from './activity'
import { dashPlugin } from './plugin'

export type * from './plugin'
export type * from './activity'

export const Activity = {
  plugin: dashPlugin,
  Admin: AdminActivity,
  AdminUser: AdminUserActivity,
  User: UserActivity,
  Organization: OrganizationActivity
}
