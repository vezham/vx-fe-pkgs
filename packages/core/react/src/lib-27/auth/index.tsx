'use client'

import { AdditionalField } from './additional-field'
import { Auth as AuthRoot } from './auth'
import { AuthProvider } from './auth-provider'
import { AuthRedirect } from './auth-redirect'
import { AuthCallback, AuthError } from './auth-result'
import { ForgotPassword } from './forgot-password'
import { OpenEmailButton } from './open-email-button'
import { OtpField } from './otp-field'
import { PasswordStrengthMeter } from './password-strength-meter'
import { ProviderButton } from './provider-button'
import { ProviderButtons } from './provider-buttons'
import { ResetLinkSent } from './reset-link-sent'
import { ResetPassword } from './reset-password'
import { AccountSettings } from './settings/account/account-settings'
import { ChangeAvatar } from './settings/account/change-avatar'
import { ChangeEmail } from './settings/account/change-email'
import { UserProfile } from './settings/account/user-profile'
import { ActiveSession } from './settings/security/active-session'
import { ActiveSessions } from './settings/security/active-sessions'
import { ChangePassword } from './settings/security/change-password'
import { LinkedAccount } from './settings/security/linked-account'
import { LinkedAccounts } from './settings/security/linked-accounts'
import { SecuritySettings } from './settings/security/security-settings'
import { Settings } from './settings/settings'
import { SignIn } from './sign-in'
import { SignOut } from './sign-out'
import { SignUp } from './sign-up'
import { UserAvatar } from './user/user-avatar'
import { UserButton } from './user/user-button'
import { UserView } from './user/user-view'
import { VerifyEmail } from './verify-email'

export type * from './auth'
export type * from './auth-provider'
export type * from './auth-redirect'
export type * from './auth-result'
export type * from './sign-in'
export type * from './sign-out'
export type * from './sign-up'
export type * from './forgot-password'
export type * from './reset-password'
export type * from './reset-link-sent'
export type * from './verify-email'
export type * from './provider-button'
export type * from './provider-buttons'
export type * from './open-email-button'
export type * from './additional-field'
export type * from './otp-field'
export type * from './password-strength-meter'
export type * from './settings/settings'
export type * from './settings/account/account-settings'
export type * from './settings/account/user-profile'
export type * from './settings/account/change-avatar'
export type * from './settings/account/change-email'
export type * from './settings/security/security-settings'
export type * from './settings/security/active-sessions'
export type * from './settings/security/active-session'
export type * from './settings/security/change-password'
export type * from './settings/security/linked-accounts'
export type * from './settings/security/linked-account'
export type * from './user/user-view'
export type * from './user/user-avatar'
export type * from './user/user-button'

export type * from './lib/auth-plugin'

export const Auth = Object.assign(AuthRoot, {
  Provider: AuthProvider,
  SignIn,
  SignOut,
  SignUp,
  ForgotPassword,
  ResetPassword,
  ResetLinkSent,
  VerifyEmail,
  Redirect: AuthRedirect,
  Callback: AuthCallback,
  Error: AuthError,
  ProviderButton,
  ProviderButtons,
  OpenEmailButton,
  AdditionalField,
  OtpField,
  PasswordStrengthMeter,
  User: Object.assign(UserView, { Avatar: UserAvatar, Button: UserButton }),
  Settings: Object.assign(Settings, {
    Account: Object.assign(AccountSettings, {
      Profile: UserProfile,
      ChangeAvatar,
      ChangeEmail
    }),
    Security: Object.assign(SecuritySettings, {
      Sessions: Object.assign(ActiveSessions, { Item: ActiveSession }),
      ChangePassword,
      LinkedAccounts: Object.assign(LinkedAccounts, { Item: LinkedAccount })
    })
  })
})
