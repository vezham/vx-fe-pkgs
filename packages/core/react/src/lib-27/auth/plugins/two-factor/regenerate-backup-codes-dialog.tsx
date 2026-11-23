import { useState } from 'react'

import type { TwoFactorAuthClient } from '@vezham/auth-ui-core/plugins/two-factor'
import { twoFactorPlugin } from '@vezham/auth-ui-core/plugins/two-factor'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useGenerateBackupCodes } from '@vezham/auth-ui-react/plugins/two-factor'
import { Key } from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  FieldError,
  Input,
  Label,
  TextField,
  toast
} from '@vezham/react-v3'

import { useAuthForm } from '../../auth-form'
import { useTwoFactorPasswordRequirement } from '../../lib/use-two-factor-password'
import { BackupCodes } from './backup-codes'

export type RegenerateBackupCodesDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Replace the existing backup codes with a fresh set.
 *
 * The new codes are shown once, in component state only — closing the dialog
 * is the point of no return, which is why the copy button sits right there.
 *
 * @param isOpen - Whether the dialog is open.
 * @param onOpenChange - Called when the dialog requests an open state change.
 */
export const RegenerateBackupCodesDialog = ({
  isOpen,
  onOpenChange
}: RegenerateBackupCodesDialogProps) => {
  const { authClient, localization } = useAuth<TwoFactorAuthClient>()
  const { localization: twoFactorLocalization } = useAuthPlugin(twoFactorPlugin)
  const { isPending: isResolvingPasswordRequirement, requiresPassword } =
    useTwoFactorPasswordRequirement()

  const [codes, setCodes] = useState<string[]>([])

  const {
    mutateAsync: generateBackupCodes,
    isPending: isGenerating,
    reset: resetGeneration
  } = useGenerateBackupCodes(authClient, {
    onSuccess: data => {
      setCodes(data.backupCodes)
      toast.success(twoFactorLocalization.backupCodesRegenerated)
    }
  })

  const isPending = isGenerating || isResolvingPasswordRequirement

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)

    if (!open) {
      setCodes([])
      // vx-bot/NOTE: Clears the resolved backup codes from the mutation cache.
      resetGeneration()
    }
  }

  const form = useAuthForm({
    defaultValues: { password: '' },
    onSubmit: async ({ value }) => {
      if (codes.length) {
        handleOpenChange(false)
        return
      }

      await generateBackupCodes(
        requiresPassword ? { password: value.password } : {}
      )
    }
  })

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <form.AppForm>
            <form.AuthFormRoot>
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="default">
                  <Key size={16} />
                </AlertDialog.Icon>

                <AlertDialog.Heading>
                  {twoFactorLocalization.backupCodes}
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body className="overflow-visible">
                {codes.length ? (
                  <BackupCodes codes={codes} />
                ) : (
                  <>
                    <p className="text-muted text-sm">
                      {requiresPassword
                        ? twoFactorLocalization.passwordConfirmation
                        : twoFactorLocalization.backupCodesDescription}
                    </p>

                    {requiresPassword && (
                      <form.AppField name="password">
                        {field => (
                          <TextField
                            className="mt-4"
                            name={field.name}
                            autoComplete="current-password"
                            isDisabled={isPending}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={field.handleChange}>
                            <Label>{localization.auth.password}</Label>

                            <Input
                              required
                              type="password"
                              placeholder={
                                localization.auth.passwordPlaceholder
                              }
                              variant="secondary"
                            />

                            <FieldError />
                          </TextField>
                        )}
                      </form.AppField>
                    )}
                  </>
                )}
              </AlertDialog.Body>

              <AlertDialog.Footer>
                {!codes.length && (
                  <Button
                    slot="close"
                    variant="tertiary"
                    isDisabled={isPending}>
                    {localization.settings.cancel}
                  </Button>
                )}

                <form.AuthFormSubmitButton
                  isPending={isPending}
                  isDisabled={isPending}>
                  {codes.length
                    ? twoFactorLocalization.done
                    : twoFactorLocalization.regenerateBackupCodes}
                </form.AuthFormSubmitButton>
              </AlertDialog.Footer>
            </form.AuthFormRoot>
          </form.AppForm>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
