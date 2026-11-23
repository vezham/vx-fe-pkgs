import type {
  ApiKeyAuthClient,
  ListedApiKey
} from '@vezham/auth-ui-core/plugins/api-key'
import { apiKeyPlugin } from '@vezham/auth-ui-core/plugins/api-key'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useDeleteApiKey } from '@vezham/auth-ui-react/plugins/api-key'
import { Key } from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Input,
  Label,
  Spinner,
  TextField
} from '@vezham/react-v3'

export type DeleteApiKeyDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  apiKey: ListedApiKey
  /** Scope the delete payload to an organization (sets `configId`). */
  organizationId?: string
}

export const DeleteApiKeyDialog = ({
  isOpen,
  onOpenChange,
  apiKey,
  organizationId
}: DeleteApiKeyDialogProps) => {
  const { authClient, localization } = useAuth<ApiKeyAuthClient>()
  const { localization: apiKeyLocalization } = useAuthPlugin(apiKeyPlugin)
  const preview = `${apiKey.start}${'*'.repeat(16)}`
  const { mutate: deleteApiKey, isPending: isDeleting } = useDeleteApiKey(
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
              <Key size={16} />
            </AlertDialog.Icon>

            <AlertDialog.Heading>
              {apiKeyLocalization.deleteApiKey}
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body className="flex flex-col gap-4 overflow-visible">
            <p className="text-muted text-sm">
              {apiKeyLocalization.deleteApiKeyWarning}
            </p>

            <TextField
              value={preview}
              className="font-mono text-xs"
              variant="secondary">
              <Label>{apiKey.name || apiKeyLocalization.apiKey}</Label>

              <Input readOnly className="font-mono text-xs" />
            </TextField>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary" isDisabled={isDeleting}>
              {localization.settings.cancel}
            </Button>

            <Button
              variant="danger"
              onPress={() =>
                deleteApiKey({
                  keyId: apiKey.id,
                  ...(organizationId ? { configId: 'organization' } : {})
                })
              }
              isPending={isDeleting}>
              {isDeleting && <Spinner color="current" size="sm" />}

              {apiKeyLocalization.deleteApiKey}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
