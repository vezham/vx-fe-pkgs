'use client'

import { AddPasskeyDialog } from './add-passkey-dialog'
import { DeletePasskeyDialog } from './delete-passkey-dialog'
import { Passkey as PasskeyRoot } from './passkey'
import { PasskeyButton } from './passkey-button'
import { PasskeySkeleton } from './passkey-skeleton'
import { Passkeys } from './passkeys'
import { PasskeysEmpty } from './passkeys-empty'
import { passkeyPlugin } from './plugin'
import { RenamePasskeyDialog } from './rename-passkey-dialog'

export type * from './passkeys'
export type * from './plugin'
export type * from './passkey-button'
export type * from './passkey'
export type * from './passkey-skeleton'
export type * from './passkeys-empty'
export type * from './add-passkey-dialog'
export type * from './delete-passkey-dialog'
export type * from './rename-passkey-dialog'

export const Passkey = Object.assign(Passkeys, {
  plugin: passkeyPlugin,
  Button: PasskeyButton,
  Item: PasskeyRoot,
  Skeleton: PasskeySkeleton,
  Empty: PasskeysEmpty,
  AddDialog: AddPasskeyDialog,
  DeleteDialog: DeletePasskeyDialog,
  RenameDialog: RenamePasskeyDialog
})
