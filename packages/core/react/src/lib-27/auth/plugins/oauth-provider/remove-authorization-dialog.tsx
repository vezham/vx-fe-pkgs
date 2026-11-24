'use client'

import { useState } from 'react'

import type {
  AuthorizedOAuthApplication,
  OAuthProviderAuthClient
} from '@vezham/auth-ui-core/plugins/oauth-provider'
import { oauthProviderPlugin } from '@vezham/auth-ui-core/plugins/oauth-provider'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useDeleteOAuthConsent } from '@vezham/auth-ui-react/plugins/oauth-provider'
import { ShieldWarning as ShieldExclamation } from '@vezham/icons-react'
import { AlertDialog, Button, Spinner } from '@vezham/react-v3'

export type RemoveAuthorizationDialogProps = {
  /** @remarks `AuthorizedOAuthApplication` */
  application: AuthorizedOAuthApplication
  clientName: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Confirmation for removing every consent record tied to one OAuth client.
 *
 * The copy is deliberate: Better Auth's consent deletion removes the stored
 * approval, so the application must ask again — it does not revoke access or
 * refresh tokens that were already issued.
 */
export const RemoveAuthorizationDialog = ({
  application,
  clientName,
  isOpen,
  onOpenChange
}: RemoveAuthorizationDialogProps) => {
  const { authClient, localization } = useAuth<OAuthProviderAuthClient>()
  const { localization: oauthLocalization } = useAuthPlugin(oauthProviderPlugin)
  const [isRemoving, setIsRemoving] = useState(false)

  const { mutateAsync: deleteConsent } = useDeleteOAuthConsent(authClient)

  const removeAuthorization = async () => {
    setIsRemoving(true)

    try {
      // vx-bot/NOTE: Sequential so a mid-list failure leaves a predictable server state
      // vx-bot/NOTE: that the refetched list reflects accurately.
      for (const id of application.consentIds) {
        // react-doctor-disable-next-line react-doctor/async-await-in-loop -- Revoke records sequentially to avoid racing independent mutations that update the active application list.
        await deleteConsent({ id })
      }

      onOpenChange(false)
    } catch {
      // vx-bot/NOTE: The error toaster reports the failure; the dialog stays open so the
      // vx-bot/NOTE: remaining records can be retried.
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.CloseTrigger />

          <AlertDialog.Header>
            <AlertDialog.Icon status="danger">
              <ShieldExclamation size={16} />
            </AlertDialog.Icon>

            <AlertDialog.Heading>
              {oauthLocalization.removeAuthorizationTitle}
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body className="flex flex-col gap-4">
            <p className="text-muted text-sm">
              {oauthLocalization.removeAuthorizationDescription}
            </p>

            <p className="text-sm font-medium">{clientName}</p>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary" isDisabled={isRemoving}>
              {localization.settings.cancel}
            </Button>

            <Button
              variant="danger"
              isPending={isRemoving}
              onPress={() => void removeAuthorization()}>
              {isRemoving && <Spinner color="current" size="sm" />}

              {oauthLocalization.remove}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
