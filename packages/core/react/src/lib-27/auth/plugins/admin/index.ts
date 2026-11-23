'use client'

import { Admin as AdminRoot } from './admin'
import { AdminUsers } from './admin-users'
import { adminPlugin } from './plugin'
import { StopImpersonating } from './stop-impersonating'

export type * from './admin'
export type * from './plugin'
export type * from './admin-users'
export type * from './stop-impersonating'

export const Admin = Object.assign(AdminRoot, {
  plugin: adminPlugin,
  Users: AdminUsers,
  StopImpersonating: StopImpersonating
})
