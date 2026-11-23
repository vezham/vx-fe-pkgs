import { ChangeEmailConfirmationEmail } from './change-email-confirmation-email'
import { DeleteAccountVerificationEmail } from './delete-account-verification-email'
import { EmailChangedEmail } from './email-changed-email'
import { EmailVerificationEmail } from './email-verification-email'
import { MagicLinkEmail } from './magic-link-email'
import { NewDeviceEmail } from './new-device-email'
import { OrganizationInvitationEmail } from './organization-invitation-email'
import { OtpEmail } from './otp-email'
import { PasswordChangedEmail } from './password-changed-email'
import { ResetPasswordEmail } from './reset-password-email'

export type * from './change-email-confirmation-email'
export type * from './delete-account-verification-email'
export type * from './email-changed-email'
export type * from './email-verification-email'
export type * from './magic-link-email'
export type * from './new-device-email'
export type * from './organization-invitation-email'
export type * from './otp-email'
export type * from './password-changed-email'
export type * from './reset-password-email'

export const AuthEmail = {
  ChangeEmailConfirmation: ChangeEmailConfirmationEmail,
  DeleteAccountVerification: DeleteAccountVerificationEmail,
  EmailChanged: EmailChangedEmail,
  EmailVerification: EmailVerificationEmail,
  MagicLink: MagicLinkEmail,
  NewDevice: NewDeviceEmail,
  OrganizationInvitation: OrganizationInvitationEmail,
  Otp: OtpEmail,
  PasswordChanged: PasswordChangedEmail,
  ResetPassword: ResetPasswordEmail
}
