import { createElement } from 'react'

import {
  type AuthPluginBase,
  type AuthPluginLocalizationContext,
  createAuthPlugin
} from '@vezham/auth-ui-core'
import {
  type OAuthProviderLocalization,
  type OAuthProviderPluginOptions,
  oauthProviderPlugin as coreOAuthProviderPlugin
} from '@vezham/auth-ui-core/plugins/oauth-provider'
import { Code } from '@vezham/icons-react'

import { AuthorizedApplications } from './authorized-applications'
import { OrganizationOAuthClients, UserOAuthClients } from './oauth-clients'
import { OAuthConsent } from './oauth-consent'
import { OAuthSelectAccount } from './oauth-select-account'
import { OAuthSignUp } from './oauth-sign-up'

const clientManagementLabel = (label: string) =>
  createElement(
    'span',
    { className: 'flex items-center gap-1' },
    createElement(Code, { className: 'text-muted' }),
    label
  )

export const oauthProviderPlugin = createAuthPlugin(
  coreOAuthProviderPlugin.id,
  (options: OAuthProviderPluginOptions = {}) => {
    const core = coreOAuthProviderPlugin(options)
    const localizedTabs = (localization: OAuthProviderLocalization) => ({
      ...(core.clientManagement
        ? {
            settingsTabs: [
              {
                view: 'oauthClients' as const,
                label: clientManagementLabel(localization.oauthClients),
                component: UserOAuthClients
              }
            ]
          }
        : {}),
      ...(core.organizationClientManager
        ? {
            organizationTabs: [
              {
                id: 'oauthClients',
                path: options.clientManagementPath ?? 'oauth-clients',
                label: clientManagementLabel(localization.oauthClients),
                component: OrganizationOAuthClients
              }
            ]
          }
        : {})
    })

    return {
      ...core,
      views: {
        auth: {
          oauthConsent: OAuthConsent,
          // vx-bot/NOTE: A route of its own rather than an override of the built-in
          // vx-bot/NOTE: `signUp` view — ordinary sign-up stays untouched.
          oauthSignUp: OAuthSignUp,
          oauthSelectAccount: OAuthSelectAccount
        }
      },
      ...(core.showConnectedApplications
        ? { securityCards: [AuthorizedApplications] }
        : {}),
      ...localizedTabs(core.localization),
      _localizationResolver: (
        plugin: AuthPluginBase,
        context: AuthPluginLocalizationContext
      ) => ({
        ...plugin,
        // vx-bot/NOTE: the resolver receives this plugin's resolved localization
        ...localizedTabs(context.localization as OAuthProviderLocalization)
      })
    }
  }
)
