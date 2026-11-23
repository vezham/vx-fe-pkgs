import { useState } from 'react'

import { passkeyPlugin } from '@vezham/auth-ui-core/plugins/passkey'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { Scanner as Fingerprint, Close as Xmark } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import {
  DeletePasskeyDialog,
  type ListedPasskey
} from './delete-passkey-dialog'
import { RenamePasskeyDialog } from './rename-passkey-dialog'

export type PasskeyProps = {
  passkey: ListedPasskey
}

export const Passkey = ({ passkey }: PasskeyProps) => {
  const { locale, localization } = useAuth()
  const { localization: passkeyLocalization } = useAuthPlugin(passkeyPlugin)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)

  const passkeyName = passkey.name || passkeyLocalization.passkey

  return (
    <div className="flex items-center gap-3">
      <div className="bg-surface-secondary flex size-10 shrink-0 items-center justify-center rounded-xl">
        <Fingerprint size={16} className="size-4.5" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm leading-tight font-medium">
          {passkeyName}
        </span>

        <span className="text-muted text-xs">
          {new Date(passkey.createdAt).toLocaleString(locale.languageTag, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </span>
      </div>

      <Button
        className="ml-auto shrink-0"
        variant="outline"
        size="sm"
        onPress={() => setRenameOpen(true)}>
        {passkeyLocalization.renamePasskey}
      </Button>

      <Button
        className="shrink-0"
        variant="outline"
        size="sm"
        onPress={() => setDeleteOpen(true)}
        aria-label={passkeyLocalization.deletePasskey.replace(
          '{{name}}',
          passkeyName
        )}>
        <Xmark size={16} />

        {localization.settings.delete}
      </Button>

      <DeletePasskeyDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        passkey={passkey}
      />
      <RenamePasskeyDialog
        isOpen={renameOpen}
        onOpenChange={setRenameOpen}
        passkey={passkey}
      />
    </div>
  )
}
