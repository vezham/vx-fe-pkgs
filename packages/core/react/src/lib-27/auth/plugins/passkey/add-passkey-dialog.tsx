import { isReauthenticationRequiredError } from '@vezham/auth-ui-core'
import type {
  AddPasskeyParams,
  PasskeyAuthClient
} from '@vezham/auth-ui-core/plugins/passkey'
import { passkeyPlugin } from '@vezham/auth-ui-core/plugins/passkey'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useAddPasskey } from '@vezham/auth-ui-react/plugins/passkey'
import { Scanner as Fingerprint } from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  FieldError,
  Input,
  Label,
  TextField
} from '@vezham/react-v3'

import { useAuthForm } from '../../auth-form'
import { ReauthenticationAction } from '../../reauthentication'

export type AddPasskeyDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const AddPasskeyDialog = ({
  isOpen,
  onOpenChange
}: AddPasskeyDialogProps) => {
  const { authClient, localization } = useAuth<PasskeyAuthClient>()
  const { authenticatorAttachment, localization: passkeyLocalization } =
    useAuthPlugin(passkeyPlugin)

  const addPasskey = useAddPasskey(authClient)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      addPasskey.reset()
    }
    onOpenChange(open)
  }

  const submitRequest = async (
    request: AddPasskeyParams<PasskeyAuthClient>
  ) => {
    const requestWithCallbacks = {
      ...request,
      fetchOptions: {
        ...request?.fetchOptions,
        onSuccess: () => handleOpenChange(false)
      }
    }
    await addPasskey.mutateAsync(requestWithCallbacks)
  }

  const form = useAuthForm({
    defaultValues: { name: '' },
    onSubmit: async ({ value }) => {
      const name = value.name.trim()
      await submitRequest({
        ...(name ? { name } : {}),
        ...(authenticatorAttachment ? { authenticatorAttachment } : {})
      })
    }
  })

  const needsReauthentication = isReauthenticationRequiredError(
    addPasskey.error
  )

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          {needsReauthentication ? (
            <>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Heading className="sr-only">
                  {localization.settings.reauthenticationTitle}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <ReauthenticationAction showTitle={false} />
              </AlertDialog.Body>
            </>
          ) : (
            <form.AppForm>
              <form.AuthFormRoot>
                <AlertDialog.CloseTrigger />

                <AlertDialog.Header>
                  <AlertDialog.Icon status="default">
                    <Fingerprint size={16} />
                  </AlertDialog.Icon>

                  <AlertDialog.Heading>
                    {passkeyLocalization.addPasskey}
                  </AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body className="overflow-visible">
                  <p className="text-muted text-sm">
                    {passkeyLocalization.passkeysDescription}
                  </p>

                  <form.AppField name="name">
                    {field => (
                      <TextField
                        className="mt-4"
                        id="name"
                        name={field.name}
                        isDisabled={addPasskey.isPending}
                        isInvalid={addPasskey.isError}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}>
                        <Label>{passkeyLocalization.name}</Label>

                        <Input
                          placeholder={localization.settings.optional}
                          variant="secondary"
                        />

                        <FieldError>
                          {addPasskey.error?.error?.message ??
                            addPasskey.error?.message}
                        </FieldError>
                      </TextField>
                    )}
                  </form.AppField>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button
                    slot="close"
                    variant="tertiary"
                    isDisabled={addPasskey.isPending}>
                    {localization.settings.cancel}
                  </Button>

                  <form.AuthFormSubmitButton
                    isPending={addPasskey.isPending}
                    isDisabled={addPasskey.isPending}>
                    {passkeyLocalization.addPasskey}
                  </form.AuthFormSubmitButton>
                </AlertDialog.Footer>
              </form.AuthFormRoot>
            </form.AppForm>
          )}
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
