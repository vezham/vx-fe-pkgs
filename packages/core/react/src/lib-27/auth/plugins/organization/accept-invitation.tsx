import { getSafeRedirectTo } from '@vezham/auth-ui-core'
import type { OrganizationLocalization } from '@vezham/auth-ui-core/plugins/organization'
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
  cn
} from '@vezham/react-v3'

import { useBrowserSearch } from '../../lib/use-browser-search'
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

const InvitationHeader = ({
  isLoading,
  isAvailable,
  localization,
  organizationName
}: {
  isLoading: boolean
  isAvailable: boolean
  localization: OrganizationLocalization
  organizationName: string
}) => (
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
      <Card.Description>{localization.acceptInvitationTitle}</Card.Description>
    </div>
  </Card.Header>
)

const InvitationDetails = ({
  isAvailable,
  isLoading,
  organizationName,
  role,
  sessionUser,
  isSessionPending,
  localization
}: {
  isAvailable: boolean
  isLoading: boolean
  organizationName: string
  role: string
  sessionUser?: { name: string; email: string }
  isSessionPending: boolean
  localization: OrganizationLocalization
}) => (
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
        <UserAvatar user={sessionUser} isPending={isSessionPending} />
        {sessionUser ? (
          <div className="grid min-w-0 gap-0.5">
            <p className="text-sm font-medium break-words">
              {sessionUser.name || sessionUser.email}
            </p>
            {sessionUser.name ? (
              <p className="text-muted text-sm break-all">
                {sessionUser.email}
              </p>
            ) : null}
          </div>
        ) : (
          <Skeleton className="h-4 w-40" />
        )}
      </div>
    </div>
  </Card.Content>
)

const InvitationActions = ({
  accept,
  reject,
  isAccepting,
  isAvailable,
  isLoading,
  isRejecting,
  invitation,
  localization,
  onReturn
}: {
  accept: (id: string) => void
  reject: (id: string) => void
  isAccepting: boolean
  isAvailable: boolean
  isLoading: boolean
  isRejecting: boolean
  invitation?: UserInvitation
  localization: OrganizationLocalization
  onReturn: () => void
}) => (
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
          onPress={() => reject(invitation.id)}>
          {isRejecting ? <Spinner color="current" size="sm" /> : null}
          {localization.rejectInvitation}
        </Button>
        <Button
          className="h-11 w-full"
          isDisabled={isAccepting || isRejecting}
          onPress={() => accept(invitation.id)}>
          {isAccepting ? <Spinner color="current" size="sm" /> : null}
          {localization.accept}
        </Button>
      </>
    ) : (
      <Button className="col-span-2 h-11 w-full" onPress={onReturn}>
        {localization.return}
      </Button>
    )}
  </Card.Footer>
)

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
  const search = useBrowserSearch()
  const invitationId =
    search === null ? null : new URLSearchParams(search).get('invitationId')
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
    search === null ||
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
      <InvitationHeader
        isLoading={isLoading}
        isAvailable={isAvailable}
        localization={localization}
        organizationName={organizationName}
      />
      <InvitationDetails
        isAvailable={isAvailable}
        isLoading={isLoading}
        organizationName={organizationName}
        role={role}
        sessionUser={session.data?.user}
        isSessionPending={session.isPending}
        localization={localization}
      />
      <InvitationActions
        accept={id => acceptInvitation({ invitationId: id })}
        reject={id => rejectInvitation({ invitationId: id })}
        isAccepting={isAccepting}
        isAvailable={isAvailable}
        isLoading={isLoading}
        isRejecting={isRejecting}
        invitation={invitation}
        localization={localization}
        onReturn={returnToApplication}
      />
    </Card>
  )
}
