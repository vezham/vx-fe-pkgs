import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import { useListUserInvitations } from '@vezham/auth-ui-react/plugins/organization'
import { Card, type CardProps } from '@vezham/react-v3'

import { UserInvitationRow } from './user-invitation-row'
import { UserInvitationRowSkeleton } from './user-invitation-row-skeleton'
import { UserInvitationsEmpty } from './user-invitations-empty'

export type UserInvitationsProps = {
  variant?: CardProps['variant']
}

/**
 * Organization invitations for the signed-in user (from
 * {@link useListUserInvitations}). Always renders the section card; uses
 * {@link UserInvitationsEmpty} when there are no pending invitations.
 */
export const UserInvitations = ({ variant }: UserInvitationsProps) => {
  const { authClient } = useAuth<OrganizationAuthClient>()
  const { localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)
  const session = useSession(authClient)
  const emailVerified = session.data?.user.emailVerified === true

  const { data: invitations, isPending } = useListUserInvitations(authClient, {
    enabled: emailVerified
  })

  return (
    <div className="flex flex-col gap-3">
      <h2 className="truncate text-sm font-semibold">
        {organizationLocalization.invitations}
      </h2>

      <Card variant={variant}>
        <Card.Content>
          {session.isPending || (emailVerified && isPending) ? (
            <UserInvitationRowSkeleton />
          ) : !invitations?.length ? (
            <UserInvitationsEmpty verificationRequired={!emailVerified} />
          ) : (
            invitations?.map((invitation, index) => (
              <div key={invitation.id}>
                {index > 0 && (
                  <div className="-mx-4 my-4 border-b border-dashed" />
                )}

                <UserInvitationRow invitation={invitation} />
              </div>
            ))
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
