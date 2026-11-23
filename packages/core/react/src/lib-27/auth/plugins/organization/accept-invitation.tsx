import { getSafeRedirectTo } from '@vezham/auth-ui-core'
import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useAuthenticate } from '@vezham/auth-ui-react'
import {
  useAcceptInvitation,
  useInvitation,
  useRejectInvitation
} from '@vezham/auth-ui-react/plugins/organization'
import type { Invitation } from '@vezham/auth/client'
import { Case as Briefcase } from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  Description,
  Skeleton,
  Spinner,
  cn,
  useIsHydrated
} from '@vezham/react-v3'

import { UserAvatar } from '../../user/user-avatar'

type UserInvitation = Invitation & { organizationName?: string }

export type AcceptInvitationProps = {
  className?: string
  variant?: CardProps['variant']
}

const isPendingInvitation = (invitation: UserInvitation | undefined) => {
  if (invitation?.status !== 'pending') return false

  return new Date(invitation.expiresAt).getTime() > Date.now()
}

/**
 * Render the organization invitation addressed by the `invitationId` query
 * parameter and let the signed-in recipient accept or reject it directly.
 */
export const AcceptInvitation = ({
  className,
  variant
}: AcceptInvitationProps) => {
  const { authClient, navigate, redirectTo } = useAuth<OrganizationAuthClient>()
  const { localization, roles } = useAuthPlugin(organizationPlugin)
  const organizationAuthClient = authClient
  const isHydrated = useIsHydrated()
  const invitationId = isHydrated
    ? new URLSearchParams(window.location.search).get('invitationId')
    : null
  const session = useAuthenticate(organizationAuthClient)
  const invitationQuery = useInvitation(organizationAuthClient, {
    query: { id: invitationId ?? '' },
    enabled: Boolean(invitationId)
  })
  const invitation: UserInvitation | undefined =
    invitationQuery.data ?? undefined

  const returnToApplication = () => {
    navigate({
      to: getSafeRedirectTo(redirectTo, window.location.origin),
      replace: true
    })
  }

  const { mutate: acceptInvitation, isPending: isAccepting } =
    useAcceptInvitation(organizationAuthClient, {
      onSuccess: returnToApplication
    })
  const { mutate: rejectInvitation, isPending: isRejecting } =
    useRejectInvitation(organizationAuthClient, {
      onSuccess: returnToApplication
    })
  const isLoading =
    !isHydrated ||
    session.isPending ||
    !session.data ||
    (Boolean(invitationId) && invitationQuery.isPending)
  const isAvailable = isPendingInvitation(invitation)
  const organizationName =
    invitation?.organizationName || localization.organization
  const role = invitation
    ? (roles?.[invitation.role] ?? invitation.role)
    : localization.member

  return (
    <Card
      className={cn('w-full max-w-lg gap-0 overflow-hidden p-0', className)}
      variant={variant}>
      <Card.Header className="grid justify-items-center gap-5 p-6 text-center">
        <div className="bg-surface-secondary flex size-16 items-center justify-center rounded-full">
          <Briefcase size={16} aria-hidden="true" className="size-7" />
        </div>
        <div className="grid gap-1">
          <Card.Title className="max-w-full text-xl font-semibold break-words">
            {isLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : isAvailable ? (
              organizationName
            ) : (
              localization.invitationUnavailable
            )}
          </Card.Title>
          <Card.Description>
            {localization.acceptInvitationTitle}
          </Card.Description>
        </div>
      </Card.Header>
      <Card.Content className="px-4 pb-6 sm:px-6">
        <div className="bg-surface-secondary grid gap-5 rounded-lg p-5">
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : isAvailable ? (
            <>
              <Description>
                {localization.acceptInvitationDescription
                  .replace('{{organization}}', organizationName)
                  .replace('{{role}}', role)}
              </Description>
              <dl className="grid gap-1">
                <dt className="text-muted text-sm">{localization.role}</dt>
                <dd className="text-base font-medium">{role}</dd>
              </dl>
            </>
          ) : (
            <Description>
              {localization.invitationUnavailableDescription}
            </Description>
          )}
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar
              user={session.data?.user}
              isPending={session.isPending}
            />
            {session.data ? (
              <div className="grid min-w-0 gap-0.5">
                <p className="text-sm font-medium break-words">
                  {session.data.user.name || session.data.user.email}
                </p>
                {session.data.user.name ? (
                  <p className="text-muted text-sm break-all">
                    {session.data.user.email}
                  </p>
                ) : null}
              </div>
            ) : (
              <Skeleton className="h-4 w-40" />
            )}
          </div>
        </div>
      </Card.Content>
      <Card.Footer className="border-separator grid grid-cols-2 gap-3 border-t p-4 sm:p-6">
        {isLoading ? (
          <>
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </>
        ) : isAvailable && invitation ? (
          <>
            <Button
              className="h-11 w-full"
              variant="secondary"
              isDisabled={isAccepting || isRejecting}
              onPress={() => rejectInvitation({ invitationId: invitation.id })}>
              {isRejecting ? <Spinner color="current" size="sm" /> : null}
              {localization.rejectInvitation}
            </Button>
            <Button
              className="h-11 w-full"
              isDisabled={isAccepting || isRejecting}
              onPress={() => acceptInvitation({ invitationId: invitation.id })}>
              {isAccepting ? <Spinner color="current" size="sm" /> : null}
              {localization.accept}
            </Button>
          </>
        ) : (
          <Button
            className="col-span-2 h-11 w-full"
            onPress={returnToApplication}>
            {localization.return}
          </Button>
        )}
      </Card.Footer>
    </Card>
  )
}
