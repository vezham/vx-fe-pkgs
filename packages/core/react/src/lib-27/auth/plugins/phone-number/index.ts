'use client'

import { ChangePhoneNumber } from './change-phone-number'
import { ForgotPhoneNumberPassword } from './forgot-phone-number-password'
import { InternationalPhoneField } from './international-phone-field'
import { PhoneNumber as PhoneNumberRoot } from './phone-number'
import { PhoneNumberButton } from './phone-number-button'
import { phoneNumberPlugin } from './plugin'
import { RemovePhoneNumberDialog } from './remove-phone-number-dialog'
import { ResetPhoneNumberPassword } from './reset-phone-number-password'

export type * from './phone-number'
export type * from './plugin'
export type * from './phone-number-button'
export type * from './international-phone-field'
export type * from './change-phone-number'
export type * from './forgot-phone-number-password'
export type * from './reset-phone-number-password'
export type * from './remove-phone-number-dialog'

export const PhoneNumber = Object.assign(PhoneNumberRoot, {
  plugin: phoneNumberPlugin,
  Button: PhoneNumberButton,
  Field: InternationalPhoneField,
  Change: ChangePhoneNumber,
  ForgotPassword: ForgotPhoneNumberPassword,
  ResetPassword: ResetPhoneNumberPassword,
  RemoveDialog: RemovePhoneNumberDialog
})
