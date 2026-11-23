import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useAcceptInvitation,
  useRejectInvitation
} from '@vezham/auth-ui-react/plugins/organization'
import type { Invitation } from '@vezham/auth/client'
import {
  CheckRead as Check,
  ClockCircle as Clock,
  Close as Xmark
} from '@vezham/icons-react'
import { Button, Chip, Spinner } from '@vezham/react-v3'

export type UserInvitationRowProps = {
  invitation: Invitation & { organizationName?: string }
}

/**
 * Single invitation row with accept/reject actions for the current user.
 */
export const UserInvitationRow = ({ invitation }: UserInvitationRowProps) => {
  const { authClient, locale } = useAuth<OrganizationAuthClient>()
  const { localization: organizationLocalization, roles } =
    useAuthPlugin(organizationPlugin)

  const { mutate: acceptInvitation, isPending: isAccepting } =
    useAcceptInvitation(authClient)

  const { mutate: rejectInvitation, isPending: isRejecting } =
    useRejectInvitation(authClient)

  return (
    <div className="flex items-center gap-3">
      <div className="bg-surface-secondary flex size-10 shrink-0 items-center justify-center rounded-xl">
        <Clock size={16} className="size-4.5" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm leading-tight font-medium">
            {invitation.organizationName}
          </span>

          <Chip size="sm">{roles?.[invitation.role] ?? invitation.role}</Chip>
        </div>

        <span className="text-muted truncate text-xs">
          {new Date(invitation.createdAt).toLocaleString(locale.languageTag, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          isPending={isAccepting}
          isDisabled={isRejecting}
          onPress={() =>
            acceptInvitation({
              invitationId: invitation.id
            })
          }>
          {isAccepting ? (
            <Spinner color="current" size="sm" />
          ) : (
            <Check size={16} />
          )}

          {organizationLocalization.accept}
        </Button>

        <Button
          variant="danger-soft"
          size="sm"
          isIconOnly
          isPending={isRejecting}
          isDisabled={isAccepting}
          onPress={() =>
            rejectInvitation({
              invitationId: invitation.id
            })
          }
          aria-label={organizationLocalization.rejectInvitation}>
          {isRejecting ? (
            <Spinner color="current" size="sm" />
          ) : (
            <Xmark size={16} />
          )}
        </Button>
      </div>
    </div>
  )
}
