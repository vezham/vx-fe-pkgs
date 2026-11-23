import type { PasskeyAuthClient } from '@vezham/auth-ui-core/plugins/passkey'
import { passkeyPlugin } from '@vezham/auth-ui-core/plugins/passkey'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useDeletePasskey } from '@vezham/auth-ui-react/plugins/passkey'
import { Scanner as Fingerprint } from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Input,
  Label,
  Spinner,
  TextField
} from '@vezham/react-v3'

export type ListedPasskey = {
  id: string
  name?: string | null
  createdAt: Date
}

export type DeletePasskeyDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  passkey: ListedPasskey
}

export const DeletePasskeyDialog = ({
  isOpen,
  onOpenChange,
  passkey
}: DeletePasskeyDialogProps) => {
  const { authClient, localization } = useAuth<PasskeyAuthClient>()
  const { localization: passkeyLocalization } = useAuthPlugin(passkeyPlugin)

  const passkeyName = passkey.name || passkeyLocalization.passkey

  const { mutate: deletePasskey, isPending: isDeleting } = useDeletePasskey(
    authClient,
    {
      onSuccess: () => onOpenChange(false)
    }
  )

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.CloseTrigger />

          <AlertDialog.Header>
            <AlertDialog.Icon status="danger">
              <Fingerprint size={16} />
            </AlertDialog.Icon>

            <AlertDialog.Heading>
              {passkeyLocalization.deletePasskeyTitle}
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body className="flex flex-col gap-4 overflow-visible">
            <p className="text-muted text-sm">
              {passkeyLocalization.deletePasskeyWarning}
            </p>

            <TextField value={passkeyName} variant="secondary">
              <Label>{passkey.name || passkeyLocalization.passkey}</Label>

              <Input readOnly />
            </TextField>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary" isDisabled={isDeleting}>
              {localization.settings.cancel}
            </Button>

            <Button
              variant="danger"
              onPress={() => deletePasskey({ id: passkey.id })}
              isPending={isDeleting}>
              {isDeleting && <Spinner color="current" size="sm" />}

              {passkeyLocalization.deletePasskeyTitle}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
