import { createElement } from 'react'

import {
  type AuthPluginBase,
  type AuthPluginLocalizationContext,
  createAuthPlugin
} from '@vezham/auth-ui-core'
import {
  type DashLocalization,
  type DashPluginOptions,
  dashPlugin as coreDashPlugin
} from '@vezham/auth-ui-core/plugins/dash'
import { Pulse } from '@vezham/icons-react'

import {
  AdminActivity,
  AdminUserActivity,
  OrganizationActivity,
  UserActivity
} from './activity'

const activityLabel = (label: string) =>
  createElement(
    'span',
    { className: 'flex items-center gap-1' },
    createElement(Pulse, { className: 'text-muted' }),
    label
  )

export const dashPlugin = createAuthPlugin(
  coreDashPlugin.id,
  (options: DashPluginOptions = {}) => {
    const core = coreDashPlugin(options)
    const localizedTabs = (localization: DashLocalization) => ({
      ...(core.admin
        ? {
            adminTabs: [
              {
                id: 'activity',
                path: core.viewPaths.settings.activity,
                label: activityLabel(localization.activity),
                component: AdminActivity
              }
            ],
            adminUserTabs: [
              {
                id: 'activity',
                label: activityLabel(localization.activity),
                component: AdminUserActivity
              }
            ]
          }
        : {}),
      ...(core.user
        ? {
            settingsTabs: [
              {
                view: 'activity' as const,
                label: activityLabel(localization.activity),
                component: UserActivity
              }
            ]
          }
        : {}),
      ...(core.organization
        ? {
            organizationTabs: [
              {
                id: 'activity',
                path: core.viewPaths.settings.activity,
                label: activityLabel(localization.activity),
                component: OrganizationActivity
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
        ...localizedTabs(context.localization as DashLocalization)
      })
    }
  }
)
