import { useEffect } from 'react'

import type {
  ApiKeyAuthClient,
  ListedApiKey
} from '@vezham/auth-ui-core/plugins/api-key'
import { apiKeyPlugin } from '@vezham/auth-ui-core/plugins/api-key'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useUpdateApiKey } from '@vezham/auth-ui-react/plugins/api-key'
import { AlertDialog, Button, Input, Label, TextField } from '@vezham/react-v3'

import { useAuthForm } from '../../auth-form'

export const EditApiKeyDialog = ({
  apiKey,
  isOpen,
  onOpenChange
}: {
  apiKey: ListedApiKey
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const { authClient, localization } = useAuth<ApiKeyAuthClient>()
  const { localization: labels } = useAuthPlugin(apiKeyPlugin)

  const updateApiKey = useUpdateApiKey(authClient, {
    onSuccess: () => onOpenChange(false)
  })

  const form = useAuthForm({
    defaultValues: { name: apiKey.name ?? '' },
    onSubmit: async ({ value }) => {
      await updateApiKey.mutateAsync({
        keyId: apiKey.id,
        configId: apiKey.configId,
        name: value.name.trim()
      })
    }
  })
  useEffect(() => {
    if (isOpen) form.setFieldValue('name', apiKey.name ?? '')
  }, [apiKey.name, form, isOpen])

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <form.AppForm>
            <form.AuthFormRoot>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Heading>{labels.editApiKey}</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="overflow-visible">
                <div className="flex flex-col gap-4">
                  <form.AppField name="name">
                    {field => (
                      <TextField
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}>
                        <Label>{labels.name}</Label>
                        <Input variant="secondary" />
                      </TextField>
                    )}
                  </form.AppField>
                </div>
                {updateApiKey.error && (
                  <p className="text-danger mt-3 text-sm" role="alert">
                    {updateApiKey.error.error?.message ??
                      updateApiKey.error?.message}
                  </p>
                )}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  {localization.settings.cancel}
                </Button>
                <form.AuthFormSubmitButton
                  isPending={updateApiKey.isPending}
                  isDisabled={updateApiKey.isPending}>
                  {localization.settings.saveChanges}
                </form.AuthFormSubmitButton>
              </AlertDialog.Footer>
            </form.AuthFormRoot>
          </form.AppForm>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
