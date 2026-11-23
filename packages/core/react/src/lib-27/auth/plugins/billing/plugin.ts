import { createElement } from 'react'

import {
  type AuthPluginBase,
  type AuthPluginLocalizationContext,
  createAuthPlugin
} from '@vezham/auth-ui-core'
import {
  type BillingLocalization,
  type BillingPluginOptions,
  billingPlugin as coreBillingPlugin
} from '@vezham/auth-ui-core/plugins/billing'
import { Card as CreditCard } from '@vezham/icons-react'

import {
  OrganizationBillingSettings,
  UserBillingSettings
} from './billing-settings'

const billingLabel = (label: string) =>
  createElement(
    'span',
    { className: 'flex items-center gap-1' },
    createElement(CreditCard, { className: 'text-muted' }),
    label
  )

export const billingPlugin = createAuthPlugin(
  coreBillingPlugin.id,
  (options: BillingPluginOptions) => {
    const core = coreBillingPlugin(options)
    const localizedTabs = (localization: BillingLocalization) => ({
      ...(core.user
        ? {
            settingsTabs: [
              {
                view: 'billing' as const,
                label: billingLabel(localization.billing),
                component: UserBillingSettings
              }
            ]
          }
        : {}),
      ...(core.organization
        ? {
            organizationTabs: [
              {
                id: 'billing',
                path: core.viewPaths.settings.billing,
                label: billingLabel(localization.billing),
                component: OrganizationBillingSettings
              }
            ]
          }
        : {})
    })

    return {
      ...core,
      ...localizedTabs(core.localization),
      _localizationResolver: (
        plugin: AuthPluginBase,
        context: AuthPluginLocalizationContext
      ) => ({
        ...plugin,
        // vx-bot/NOTE: the resolver receives this plugin's resolved localization
        ...localizedTabs(context.localization as BillingLocalization)
      })
    }
  }
)
