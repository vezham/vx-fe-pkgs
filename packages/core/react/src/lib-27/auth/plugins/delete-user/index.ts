'use client'

import { DangerZone } from './danger-zone'
import { DeleteAccount } from './delete-account'
import { deleteUserPlugin } from './plugin'

export type * from './delete-account'
export type * from './plugin'
export type * from './danger-zone'

export const DeleteUser = Object.assign(DeleteAccount, {
  plugin: deleteUserPlugin,
  DangerZone: DangerZone
})
