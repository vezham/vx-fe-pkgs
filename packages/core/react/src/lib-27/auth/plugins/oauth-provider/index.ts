'use client'

import { AuthorizedApplication } from './authorized-application'
import { AuthorizedApplicationSkeleton } from './authorized-application-skeleton'
import { AuthorizedApplications } from './authorized-applications'
import { AuthorizedApplicationsEmpty } from './authorized-applications-empty'
import { OAuthClients } from './oauth-clients'
import { UserOAuthClients } from './oauth-clients'
import { OrganizationOAuthClients } from './oauth-clients'
import { OAuthConsent } from './oauth-consent'
import { OAuthSelectAccount } from './oauth-select-account'
import { OAuthSignUp } from './oauth-sign-up'
import { oauthProviderPlugin } from './plugin'
import { RemoveAuthorizationDialog } from './remove-authorization-dialog'

export type * from './plugin'
export type * from './oauth-clients'
export type * from './oauth-consent'
export type * from './oauth-select-account'
export type * from './oauth-sign-up'
export type * from './authorized-applications'
export type * from './authorized-application'
export type * from './authorized-application-skeleton'
export type * from './authorized-applications-empty'
export type * from './remove-authorization-dialog'

export const OAuthProvider = {
  plugin: oauthProviderPlugin,
  Clients: OAuthClients,
  UserClients: UserOAuthClients,
  OrganizationClients: OrganizationOAuthClients,
  Consent: OAuthConsent,
  SelectAccount: OAuthSelectAccount,
  SignUp: OAuthSignUp,
  Applications: AuthorizedApplications,
  Application: AuthorizedApplication,
  ApplicationSkeleton: AuthorizedApplicationSkeleton,
  ApplicationsEmpty: AuthorizedApplicationsEmpty,
  RemoveAuthorizationDialog: RemoveAuthorizationDialog
}
