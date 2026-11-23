import type { ComponentType } from 'react'

const withProvider =
  (load: () => Promise<ComponentType>, authenticated: boolean) => async () => {
    const [{ DemoProvider }, Demo] = await Promise.all([
      import('./demo-provider'),
      load()
    ])
    const WrappedDemo = () => (
      <DemoProvider authenticated={authenticated}>
        <Demo />
      </DemoProvider>
    )
    return WrappedDemo
  }

export const authDemos: Record<
  string,
  {
    title: string
    file: string
    loader: () => Promise<ComponentType>
    search?: string
  }
> = {
  'react-auth-api-key-api-keys': {
    title: 'ApiKeys example',
    file: 'auth/api-key/api-keys.tsx',
    loader: withProvider(
      () => import('./api-key/api-keys').then(module => module.ApiKeysDemo),
      true
    )
  },
  'react-auth-auth': {
    title: 'Auth example',
    file: 'auth/auth.tsx',
    loader: withProvider(
      () => import('./auth').then(module => module.AuthDemo),
      false
    )
  },
  'react-auth-forgot-password': {
    title: 'ForgotPassword example',
    file: 'auth/forgot-password.tsx',
    loader: withProvider(
      () =>
        import('./forgot-password').then(module => module.ForgotPasswordDemo),
      false
    )
  },
  'react-auth-reset-password': {
    title: 'ResetPassword example',
    file: 'auth/reset-password.tsx',
    loader: withProvider(
      () => import('./reset-password').then(module => module.ResetPasswordDemo),
      false
    ),
    search: '?token=preview-reset-token'
  },
  'react-auth-sign-in': {
    title: 'SignIn example',
    file: 'auth/sign-in.tsx',
    loader: withProvider(
      () => import('./sign-in').then(module => module.SignInDemo),
      false
    )
  },
  'react-auth-sign-out': {
    title: 'SignOut example',
    file: 'auth/sign-out.tsx',
    loader: withProvider(
      () => import('./sign-out').then(module => module.SignOutDemo),
      true
    )
  },
  'react-auth-sign-up': {
    title: 'SignUp example',
    file: 'auth/sign-up.tsx',
    loader: withProvider(
      () => import('./sign-up').then(module => module.SignUpDemo),
      false
    )
  },
  'react-auth-verify-email': {
    title: 'VerifyEmail example',
    file: 'auth/verify-email.tsx',
    loader: withProvider(
      () => import('./verify-email').then(module => module.VerifyEmailDemo),
      false
    )
  },
  'react-auth-delete-user-danger-zone': {
    title: 'DangerZone example',
    file: 'auth/delete-user/danger-zone.tsx',
    loader: withProvider(
      () =>
        import('./delete-user/danger-zone').then(
          module => module.DangerZoneDemo
        ),
      true
    )
  },
  'react-auth-device-authorization-device-authorization': {
    title: 'DeviceAuthorization example',
    file: 'auth/device-authorization/device-authorization.tsx',
    loader: withProvider(
      () =>
        import('./device-authorization/device-authorization').then(
          module => module.DeviceAuthorizationDemo
        ),
      true
    )
  },
  'react-auth-email-change-email-confirmation-email': {
    title: 'ChangeEmailConfirmationEmail example',
    file: 'auth/email/change-email-confirmation-email.tsx',
    loader: () =>
      import('./email/change-email-confirmation-email').then(
        module => module.ChangeEmailConfirmationEmailDemo
      )
  },
  'react-auth-email-delete-account-verification-email': {
    title: 'DeleteAccountVerificationEmail example',
    file: 'auth/email/delete-account-verification-email.tsx',
    loader: () =>
      import('./email/delete-account-verification-email').then(
        module => module.DeleteAccountVerificationEmailDemo
      )
  },
  'react-auth-email-email-changed-email': {
    title: 'EmailChangedEmail example',
    file: 'auth/email/email-changed-email.tsx',
    loader: () =>
      import('./email/email-changed-email').then(
        module => module.EmailChangedEmailDemo
      )
  },
  'react-auth-email-email-verification-email': {
    title: 'EmailVerificationEmail example',
    file: 'auth/email/email-verification-email.tsx',
    loader: () =>
      import('./email/email-verification-email').then(
        module => module.EmailVerificationEmailDemo
      )
  },
  'react-auth-email-magic-link-email': {
    title: 'MagicLinkEmail example',
    file: 'auth/email/magic-link-email.tsx',
    loader: () =>
      import('./email/magic-link-email').then(
        module => module.MagicLinkEmailDemo
      )
  },
  'react-auth-email-new-device-email': {
    title: 'NewDeviceEmail example',
    file: 'auth/email/new-device-email.tsx',
    loader: () =>
      import('./email/new-device-email').then(
        module => module.NewDeviceEmailDemo
      )
  },
  'react-auth-email-organization-invitation-email': {
    title: 'OrganizationInvitationEmail example',
    file: 'auth/email/organization-invitation-email.tsx',
    loader: () =>
      import('./email/organization-invitation-email').then(
        module => module.OrganizationInvitationEmailDemo
      )
  },
  'react-auth-email-otp-email': {
    title: 'OtpEmail example',
    file: 'auth/email/otp-email.tsx',
    loader: () =>
      import('./email/otp-email').then(module => module.OtpEmailDemo)
  },
  'react-auth-email-password-changed-email': {
    title: 'PasswordChangedEmail example',
    file: 'auth/email/password-changed-email.tsx',
    loader: () =>
      import('./email/password-changed-email').then(
        module => module.PasswordChangedEmailDemo
      )
  },
  'react-auth-email-reset-password-email': {
    title: 'ResetPasswordEmail example',
    file: 'auth/email/reset-password-email.tsx',
    loader: () =>
      import('./email/reset-password-email').then(
        module => module.ResetPasswordEmailDemo
      )
  },
  'react-auth-magic-link-magic-link': {
    title: 'MagicLink example',
    file: 'auth/magic-link/magic-link.tsx',
    loader: withProvider(
      () =>
        import('./magic-link/magic-link').then(module => module.MagicLinkDemo),
      false
    )
  },
  'react-auth-multi-session-manage-accounts': {
    title: 'ManageAccounts example',
    file: 'auth/multi-session/manage-accounts.tsx',
    loader: withProvider(
      () =>
        import('./multi-session/manage-accounts').then(
          module => module.ManageAccountsDemo
        ),
      true
    )
  },
  'react-auth-multi-session-switch-account-submenu': {
    title: 'SwitchAccountSubmenu example',
    file: 'auth/multi-session/switch-account-submenu.tsx',
    loader: withProvider(
      () =>
        import('./multi-session/switch-account-submenu').then(
          module => module.SwitchAccountSubmenuDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-danger-zone': {
    title: 'OrganizationDangerZone example',
    file: 'auth/organization/organization-danger-zone.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-danger-zone').then(
          module => module.OrganizationDangerZoneDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-invitations': {
    title: 'OrganizationInvitations example',
    file: 'auth/organization/organization-invitations.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-invitations').then(
          module => module.OrganizationInvitationsDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-members': {
    title: 'OrganizationMembers example',
    file: 'auth/organization/organization-members.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-members').then(
          module => module.OrganizationMembersDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-people': {
    title: 'OrganizationPeople example',
    file: 'auth/organization/organization-people.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-people').then(
          module => module.OrganizationPeopleDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-profile': {
    title: 'OrganizationProfile example',
    file: 'auth/organization/organization-profile.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-profile').then(
          module => module.OrganizationProfileDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-settings': {
    title: 'OrganizationSettings example',
    file: 'auth/organization/organization-settings.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-settings').then(
          module => module.OrganizationSettingsDemo
        ),
      true
    )
  },
  'react-auth-organization-organization-switcher': {
    title: 'OrganizationSwitcher example',
    file: 'auth/organization/organization-switcher.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization-switcher').then(
          module => module.OrganizationSwitcherDemo
        ),
      true
    )
  },
  'react-auth-organization-organization': {
    title: 'Organization example',
    file: 'auth/organization/organization.tsx',
    loader: withProvider(
      () =>
        import('./organization/organization').then(
          module => module.OrganizationDemo
        ),
      true
    )
  },
  'react-auth-organization-organizations-settings': {
    title: 'OrganizationsSettings example',
    file: 'auth/organization/organizations-settings.tsx',
    loader: withProvider(
      () =>
        import('./organization/organizations-settings').then(
          module => module.OrganizationsSettingsDemo
        ),
      true
    )
  },
  'react-auth-organization-organizations': {
    title: 'Organizations example',
    file: 'auth/organization/organizations.tsx',
    loader: withProvider(
      () =>
        import('./organization/organizations').then(
          module => module.OrganizationsDemo
        ),
      true
    )
  },
  'react-auth-organization-user-invitations': {
    title: 'UserInvitations example',
    file: 'auth/organization/user-invitations.tsx',
    loader: withProvider(
      () =>
        import('./organization/user-invitations').then(
          module => module.UserInvitationsDemo
        ),
      true
    )
  },
  'react-auth-passkey-passkey-sign-in': {
    title: 'PasskeySignIn example',
    file: 'auth/passkey/passkey-sign-in.tsx',
    loader: withProvider(
      () =>
        import('./passkey/passkey-sign-in').then(
          module => module.PasskeySignInDemo
        ),
      false
    )
  },
  'react-auth-account-settings': {
    title: 'AccountSettings example',
    file: 'auth/settings/account/account-settings.tsx',
    loader: withProvider(
      () =>
        import('./settings/account/account-settings').then(
          module => module.AccountSettingsDemo
        ),
      true
    )
  },
  'react-auth-change-email': {
    title: 'ChangeEmail example',
    file: 'auth/settings/account/change-email.tsx',
    loader: withProvider(
      () =>
        import('./settings/account/change-email').then(
          module => module.ChangeEmailDemo
        ),
      true
    )
  },
  'react-auth-user-profile': {
    title: 'UserProfile example',
    file: 'auth/settings/account/user-profile.tsx',
    loader: withProvider(
      () =>
        import('./settings/account/user-profile').then(
          module => module.UserProfileDemo
        ),
      true
    )
  },
  'react-auth-active-sessions': {
    title: 'ActiveSessions example',
    file: 'auth/settings/security/active-sessions.tsx',
    loader: withProvider(
      () =>
        import('./settings/security/active-sessions').then(
          module => module.ActiveSessionsDemo
        ),
      true
    )
  },
  'react-auth-change-password': {
    title: 'ChangePassword example',
    file: 'auth/settings/security/change-password.tsx',
    loader: withProvider(
      () =>
        import('./settings/security/change-password').then(
          module => module.ChangePasswordDemo
        ),
      true
    )
  },
  'react-auth-linked-accounts': {
    title: 'LinkedAccounts example',
    file: 'auth/settings/security/linked-accounts.tsx',
    loader: withProvider(
      () =>
        import('./settings/security/linked-accounts').then(
          module => module.LinkedAccountsDemo
        ),
      true
    )
  },
  'react-auth-settings-security-passkeys': {
    title: 'Passkeys example',
    file: 'auth/settings/security/passkeys.tsx',
    loader: withProvider(
      () =>
        import('./settings/security/passkeys').then(
          module => module.PasskeysDemo
        ),
      true
    )
  },
  'react-auth-security-settings': {
    title: 'SecuritySettings example',
    file: 'auth/settings/security/security-settings.tsx',
    loader: withProvider(
      () =>
        import('./settings/security/security-settings').then(
          module => module.SecuritySettingsDemo
        ),
      true
    )
  },
  'react-auth-settings': {
    title: 'Settings example',
    file: 'auth/settings/settings.tsx',
    loader: withProvider(
      () => import('./settings/settings').then(module => module.SettingsDemo),
      true
    )
  },
  'react-auth-theme-appearance': {
    title: 'Appearance example',
    file: 'auth/theme/appearance.tsx',
    loader: withProvider(
      () => import('./theme/appearance').then(module => module.AppearanceDemo),
      true
    )
  },
  'react-auth-theme-theme-toggle-item': {
    title: 'ThemeToggleItem example',
    file: 'auth/theme/theme-toggle-item.tsx',
    loader: withProvider(
      () =>
        import('./theme/theme-toggle-item').then(
          module => module.ThemeToggleItemDemo
        ),
      true
    )
  },
  'react-auth-user-avatar': {
    title: 'UserAvatar example',
    file: 'auth/user/user-avatar.tsx',
    loader: withProvider(
      () => import('./user/user-avatar').then(module => module.UserAvatarDemo),
      true
    )
  },
  'react-auth-user-user-button-icon': {
    title: 'UserButtonIcon example',
    file: 'auth/user/user-button-icon.tsx',
    loader: withProvider(
      () =>
        import('./user/user-button-icon').then(
          module => module.UserButtonIconDemo
        ),
      true
    )
  },
  'react-auth-user-user-button-links': {
    title: 'UserButtonLinks example',
    file: 'auth/user/user-button-links.tsx',
    loader: withProvider(
      () =>
        import('./user/user-button-links').then(
          module => module.UserButtonLinksDemo
        ),
      true
    )
  },
  'react-auth-user-button': {
    title: 'UserButton example',
    file: 'auth/user/user-button.tsx',
    loader: withProvider(
      () => import('./user/user-button').then(module => module.UserButtonDemo),
      true
    )
  },
  'react-auth-user-view': {
    title: 'UserView example',
    file: 'auth/user/user-view.tsx',
    loader: withProvider(
      () => import('./user/user-view').then(module => module.UserViewDemo),
      true
    )
  },
  'react-auth-username-sign-in': {
    title: 'SignInUsername example',
    file: 'auth/username/sign-in.tsx',
    loader: withProvider(
      () =>
        import('./username/sign-in').then(module => module.SignInUsernameDemo),
      false
    )
  },
  'react-auth-username-sign-up': {
    title: 'SignUpUsername example',
    file: 'auth/username/sign-up.tsx',
    loader: withProvider(
      () =>
        import('./username/sign-up').then(module => module.SignUpUsernameDemo),
      false
    )
  },
  'react-auth-username-user-profile': {
    title: 'UserProfileUsername example',
    file: 'auth/username/user-profile.tsx',
    loader: withProvider(
      () =>
        import('./username/user-profile').then(
          module => module.UserProfileUsernameDemo
        ),
      true
    )
  }
}

export const authFrames = {
  'react-auth-reset-password': authDemos['react-auth-reset-password']
}
