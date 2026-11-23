import { createElement } from 'react'

import {
  type AuthPluginBase,
  type AuthPluginLocalizationContext,
  createAuthPlugin
} from '@vezham/auth-ui-core'
import {
  type SsoLocalization,
  type SsoPluginOptions,
  ssoPlugin as coreSsoPlugin
} from '@vezham/auth-ui-core/plugins/sso'
import { ShieldCheck } from '@vezham/icons-react'

import { EmailFirstSignIn } from './email-first-sign-in'
import { OrganizationSsoProviders } from './organization-sso-providers'

export const ssoPlugin = createAuthPlugin(
  coreSsoPlugin.id,
  (options: SsoPluginOptions = {}) => {
    const plugin = coreSsoPlugin(options)
    const localizedOrganizationTab = (localization: SsoLocalization) =>
      plugin.organization
        ? {
            organizationTabs: [
              {
                id: 'sso',
                path: plugin.path,
                label: createElement(
                  'span',
                  { className: 'inline-flex items-center gap-1' },
                  createElement(ShieldCheck, {
                    'aria-hidden': true,
                    className: 'text-muted'
                  }),
                  localization.providerList
                ),
                component: OrganizationSsoProviders
              }
            ]
          }
        : {}

    return {
      ...plugin,
      ...localizedOrganizationTab(plugin.localization),
      ...(plugin.emailFirst && {
        views: { auth: { signIn: EmailFirstSignIn } }
      }),
      _localizationResolver: (
        resolvedPlugin: AuthPluginBase,
        context: AuthPluginLocalizationContext
      ) => ({
        ...resolvedPlugin,
        // vx-bot/NOTE: the resolver receives this plugin's resolved localization
        ...localizedOrganizationTab(context.localization as SsoLocalization)
      })
    }
  }
)
