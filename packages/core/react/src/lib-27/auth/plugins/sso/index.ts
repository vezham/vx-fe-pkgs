'use client'

import { EmailFirstSignIn } from './email-first-sign-in'
import { OrganizationSsoProviders } from './organization-sso-providers'
import { ssoPlugin } from './plugin'
import { SsoDomainVerification } from './sso-domain-verification'
import { SsoProviderSetup } from './sso-provider-setup'

export type * from './email-first-sign-in'
export type * from './plugin'
export type * from './sso-provider-setup'
export type * from './sso-domain-verification'
export type * from './organization-sso-providers'

export const Sso = Object.assign(EmailFirstSignIn, {
  plugin: ssoPlugin,
  Setup: SsoProviderSetup,
  DomainVerification: SsoDomainVerification,
  OrganizationProviders: OrganizationSsoProviders
})
