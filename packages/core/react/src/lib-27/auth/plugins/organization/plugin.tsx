import {
  type AuthPluginBase,
  type AuthPluginLocalizationContext,
  createAuthPlugin
} from '@vezham/auth-ui-core'
import {
  type OrganizationLocalization,
  type OrganizationPluginOptions,
  organizationPlugin as coreOrganizationPlugin
} from '@vezham/auth-ui-core/plugins/organization'
import { Case as Briefcase } from '@vezham/icons-react'

import { AcceptInvitation } from './accept-invitation'
import { OrganizationsSettings } from './organizations-settings'

export const organizationPlugin = createAuthPlugin(
  coreOrganizationPlugin.id,
  (options: OrganizationPluginOptions = {}) => {
    const coreOptions = coreOrganizationPlugin(options)
    const settingsTabs = (localization: OrganizationLocalization) => [
      {
        view: 'organizations' as const,
        label: (
          <>
            <Briefcase size={16} className="text-muted" />
            {localization.organizations}
          </>
        ),
        component: OrganizationsSettings
      }
    ]

    return {
      ...coreOptions,
      localization: coreOptions.localization,
      views: {
        auth: { acceptInvitation: AcceptInvitation }
      },
      settingsTabs: settingsTabs(coreOptions.localization),
      _localizationResolver: (
        plugin: AuthPluginBase,
        context: AuthPluginLocalizationContext
      ) => ({
        ...(coreOptions._localizationResolver?.(plugin, context) ?? plugin),
        settingsTabs: settingsTabs(
          // vx-bot/NOTE: the resolver receives this plugin's resolved localization
          context.localization as OrganizationLocalization
        )
      })
    }
  }
)
