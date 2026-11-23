'use client'

import { ChangeEmailOtp } from './change-email-otp'
import { EmailOtp as EmailOtpRoot } from './email-otp'
import { EmailOtpButton } from './email-otp-button'
import { ForgotPasswordOtp } from './forgot-password-otp'
import { emailOtpPlugin } from './plugin'
import { ResetPasswordOtp } from './reset-password-otp'
import { VerifyEmailOtp } from './verify-email-otp'

export type * from './email-otp'
export type * from './plugin'
export type * from './email-otp-button'
export type * from './change-email-otp'
export type * from './forgot-password-otp'
export type * from './reset-password-otp'
export type * from './verify-email-otp'

export const EmailOtp = Object.assign(EmailOtpRoot, {
  plugin: emailOtpPlugin,
  Button: EmailOtpButton,
  ChangeEmail: ChangeEmailOtp,
  ForgotPassword: ForgotPasswordOtp,
  ResetPassword: ResetPasswordOtp,
  VerifyEmail: VerifyEmailOtp
})
