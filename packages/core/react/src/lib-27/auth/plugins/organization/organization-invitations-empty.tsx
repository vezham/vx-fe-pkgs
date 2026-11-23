import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuthPlugin } from '@vezham/auth-ui-react'
import { SendSquare as PaperPlane } from '@vezham/icons-react'
import { Button, EmptyState } from '@vezham/react-v3'

export type OrganizationInvitationsEmptyProps = {
  isInvitePending?: boolean
  onInvitePress?: () => void
}

/**
 * Empty state for {@link OrganizationInvitations} — mirrors `ApiKeysEmpty`
 * (icon, title, description) with an "Invite member" call to action.
 */
export const OrganizationInvitationsEmpty = ({
  isInvitePending,
  onInvitePress
}: OrganizationInvitationsEmptyProps) => {
  const { localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)

  return (
    <EmptyState className="flex flex-col items-center gap-4 p-4 text-center">
      <PaperPlane size={16} className="text-muted size-6" />

      <div className="flex flex-col gap-2">
        <p className="text-foreground text-sm font-semibold">
          {organizationLocalization.noInvitations}
        </p>

        <span className="text-muted text-sm">
          {organizationLocalization.organizationInvitationsEmptyDescription}
        </span>
      </div>

      {(isInvitePending || onInvitePress) && (
        <Button isDisabled={isInvitePending} size="sm" onPress={onInvitePress}>
          {organizationLocalization.inviteMember}
        </Button>
      )}
    </EmptyState>
  )
}
