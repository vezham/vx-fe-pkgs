import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuthPlugin } from '@vezham/auth-ui-react'
import {
  Letter as Envelope,
  SendSquare as PaperPlane
} from '@vezham/icons-react'
import { EmptyState } from '@vezham/react-v3'

/**
 * Empty state for `UserInvitations`
 */
export const UserInvitationsEmpty = ({
  verificationRequired = false
}: {
  verificationRequired?: boolean
}) => {
  const { localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)

  return (
    <EmptyState className="flex flex-col items-center gap-4 text-center">
      <div className="bg-surface-secondary flex size-12 items-center justify-center rounded-full">
        {verificationRequired ? (
          <Envelope size={16} className="size-5" />
        ) : (
          <PaperPlane size={16} className="size-5" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-foreground text-sm font-semibold">
          {verificationRequired
            ? organizationLocalization.verifyEmailToViewInvitations
            : organizationLocalization.noInvitations}
        </p>

        <span className="text-muted text-sm">
          {verificationRequired
            ? organizationLocalization.verifyEmailToViewInvitationsDescription
            : organizationLocalization.userInvitationsEmptyDescription}
        </span>
      </div>
    </EmptyState>
  )
}
