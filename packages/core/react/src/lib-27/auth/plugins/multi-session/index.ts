'use client'

import { ManageAccount } from './manage-account'
import { ManageAccounts } from './manage-accounts'
import { multiSessionPlugin } from './plugin'
import { SwitchAccountSubmenu } from './switch-account-submenu'
import { SwitchAccountSubmenuContent } from './switch-account-submenu-content'
import { SwitchAccountSubmenuItem } from './switch-account-submenu-item'

export type * from './manage-accounts'
export type * from './plugin'
export type * from './manage-account'
export type * from './switch-account-submenu'
export type * from './switch-account-submenu-content'
export type * from './switch-account-submenu-item'

export const MultiSession = Object.assign(ManageAccounts, {
  plugin: multiSessionPlugin,
  Account: ManageAccount,
  Switcher: {
    Submenu: SwitchAccountSubmenu,
    Content: SwitchAccountSubmenuContent,
    Item: SwitchAccountSubmenuItem
  }
})
