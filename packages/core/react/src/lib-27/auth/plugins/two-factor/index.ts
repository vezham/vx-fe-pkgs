'use client'

import { BackupCodes } from './backup-codes'
import { DisableTwoFactorDialog } from './disable-two-factor-dialog'
import { EnableTwoFactorDialog } from './enable-two-factor-dialog'
import { twoFactorPlugin } from './plugin'
import { RegenerateBackupCodesDialog } from './regenerate-backup-codes-dialog'
import { TwoFactorChallenge } from './two-factor-challenge'
import { TwoFactorSettings } from './two-factor-settings'

export type * from './two-factor-settings'
export type * from './plugin'
export type * from './two-factor-challenge'
export type * from './backup-codes'
export type * from './enable-two-factor-dialog'
export type * from './disable-two-factor-dialog'
export type * from './regenerate-backup-codes-dialog'

export const TwoFactor = Object.assign(TwoFactorSettings, {
  plugin: twoFactorPlugin,
  Challenge: TwoFactorChallenge,
  BackupCodes: BackupCodes,
  EnableDialog: EnableTwoFactorDialog,
  DisableDialog: DisableTwoFactorDialog,
  RegenerateBackupCodesDialog: RegenerateBackupCodesDialog
})
