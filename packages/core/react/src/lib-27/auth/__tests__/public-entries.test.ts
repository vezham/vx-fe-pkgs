import { describe, expect, it } from 'vitest'

import { AuthEmail } from '../email'
import * as auth from '../index'
import { Admin } from '../plugins/admin'
import { AgentAuth } from '../plugins/agent-auth'
import { Anonymous } from '../plugins/anonymous'
import { ApiKey } from '../plugins/api-key'
import { Billing } from '../plugins/billing'
import { Activity } from '../plugins/dash'
import { DeleteUser } from '../plugins/delete-user'
import { DeviceAuthorization } from '../plugins/device-authorization'
import { EmailOtp } from '../plugins/email-otp'
import { LastLoginMethod } from '../plugins/last-login-method'
import { MagicLink } from '../plugins/magic-link'
import { MultiSession } from '../plugins/multi-session'
import { OAuthProvider } from '../plugins/oauth-provider'
import { Organization } from '../plugins/organization'
import { Passkey } from '../plugins/passkey'
import { PhoneNumber } from '../plugins/phone-number'
import { Wallet } from '../plugins/siwe'
import { Sso } from '../plugins/sso'
import { AuthTheme } from '../plugins/theme'
import { TwoFactor } from '../plugins/two-factor'
import { Username } from '../plugins/username'
import './setup'

describe('public auth API', () => {
  it('exposes core flows through Auth compound components', () => {
    expect(Object.keys(auth)).toEqual(['Auth'])
    expect(auth.Auth.Provider).toBeTypeOf('function')
    expect(auth.Auth.SignIn).toBeTypeOf('function')
    expect(auth.Auth.User.Button).toBeTypeOf('function')
    expect(auth.Auth.Settings.Account.ChangeEmail).toBeTypeOf('function')
    expect(auth.Auth.Settings.Security.Sessions.Item).toBeTypeOf('function')
  })
  it.each(
    Object.entries({
      Admin,
      AgentAuth,
      Anonymous,
      ApiKey,
      Billing,
      Activity,
      DeleteUser,
      DeviceAuthorization,
      EmailOtp,
      LastLoginMethod,
      MagicLink,
      MultiSession,
      OAuthProvider,
      Organization,
      Passkey,
      PhoneNumber,
      Wallet,
      Sso,
      AuthTheme,
      TwoFactor,
      Username
    })
  )(
    'loads the %s feature independently with its plugin registration',
    (_name, feature) => {
      expect(feature.plugin, _name).toBeTypeOf('function')
      expect(feature.plugin.id).toBeTypeOf('string')
    }
  )
  it('registers the same settings and auth views exposed by the compound API', () => {
    expect(Passkey.plugin().securityCards).toContain(Passkey)
    expect(Passkey.plugin().authButtons).toContain(Passkey.Button)
    expect(TwoFactor.plugin().securityCards).toContain(TwoFactor)
    expect(MagicLink.plugin().views?.auth?.magicLink).toBe(MagicLink)
    expect(Organization.plugin().views?.auth?.acceptInvitation).toBe(
      Organization.AcceptInvitation
    )
  })
  it('exposes all ten transactional email templates separately', () => {
    expect(Object.keys(AuthEmail)).toHaveLength(10)
    expect(AuthEmail.EmailVerification).toBeTypeOf('function')
    expect(AuthEmail.OrganizationInvitation).toBeTypeOf('function')
  })
})
