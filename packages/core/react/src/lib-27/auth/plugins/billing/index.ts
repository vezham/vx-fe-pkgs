'use client'

import { BillingSettings } from './billing-settings'
import { UserBillingSettings } from './billing-settings'
import { OrganizationBillingSettings } from './billing-settings'
import { billingPlugin } from './plugin'

export type * from './billing-settings'
export type * from './plugin'

export const Billing = Object.assign(BillingSettings, {
  plugin: billingPlugin,
  User: UserBillingSettings,
  Organization: OrganizationBillingSettings
})
