'use client'

import { useState } from 'react'

import type { ListDeviceSession } from '@vezham/auth-ui-core/plugins/multi-session'
import {
  type OAuthProviderMultiSessionAuthClient,
  oauthProviderPlugin,
  parseOAuthAuthorizationRequest,
  sanitizeOAuthClientUrl
} from '@vezham/auth-ui-core/plugins/oauth-provider'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useListDeviceSessions,
  useSetActiveSession
} from '@vezham/auth-ui-react/plugins/multi-session'
import {
  useOAuthContinue,
  usePublicOAuthClient
} from '@vezham/auth-ui-react/plugins/oauth-provider'
import { Shield } from '@vezham/icons-react'
import {
  Avatar,
  Card,
  type CardProps,
  Chip,
  Description,
  Label,
  ListBox,
  Skeleton,
  Spinner,
  cn
} from '@vezham/react-v3'

import { useBrowserSearch } from '../../lib/use-browser-search'
import { UserAvatar } from '../../user/user-avatar'

export type OAuthSelectAccountProps = {
  className?: string
  variant?: CardProps['variant']
}

const interpolateClient = (template: string, clientName: string) =>
  template.replace('{{client}}', clientName)

const OAuthClientHeader = ({
  clientName,
  description,
  isLoading,
  logoUrl,
  title
}: {
  clientName: string
  description: string
  isLoading: boolean
  logoUrl?: string
  title: string
}) => (
  <Card.Header className="grid justify-items-center gap-5 p-6 text-center">
    <div className="grid justify-items-center gap-3">
      {isLoading ? (
        <Skeleton className="size-16 rounded-full" />
      ) : (
        <Avatar className="size-16">
          <Avatar.Image
            alt={clientName}
            referrerPolicy="no-referrer"
            src={logoUrl}
          />
          <Avatar.Fallback>
            <Shield size={16} className="size-7" />
          </Avatar.Fallback>
        </Avatar>
      )}
      {isLoading ? (
        <Skeleton className="h-5 w-36" />
      ) : (
        <p className="max-w-full text-base font-medium break-words">
          {clientName}
        </p>
      )}
    </div>
    <div className="grid gap-1">
      <Card.Title className="text-xl font-semibold">{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
    </div>
  </Card.Header>
)

const DeviceSessionRow = ({
  deviceSession,
  isCurrent,
  isPending,
  currentLabel
}: {
  deviceSession: ListDeviceSession<OAuthProviderMultiSessionAuthClient>
  isCurrent: boolean
  isPending: boolean
  currentLabel: string
}) => (
  <ListBox.Item
    id={deviceSession.session.id}
    className="gap-3 rounded-none p-4"
    textValue={deviceSession.user.name || deviceSession.user.email}>
    <UserAvatar className="size-10" user={deviceSession.user} />
    <div className="flex min-w-0 flex-col">
      <Label className="text-base break-words">
        {deviceSession.user.name || deviceSession.user.email}
      </Label>
      {deviceSession.user.name ? (
        <Description className="text-sm break-all">
          {deviceSession.user.email}
        </Description>
      ) : null}
    </div>
    <div className="ml-auto flex shrink-0 items-center gap-2">
      {isCurrent ? (
        <Chip size="sm" variant="secondary">
          {currentLabel}
        </Chip>
      ) : null}
      {isPending ? <Spinner color="current" size="sm" /> : null}
    </div>
  </ListBox.Item>
)

const OAuthDeviceSessions = ({
  sessions,
  isLoading,
  isDisabled,
  currentSessionId,
  pendingSessionId,
  clientName,
  labels,
  onAction
}: {
  sessions?: ListDeviceSession<OAuthProviderMultiSessionAuthClient>[] | null
  isLoading: boolean
  isDisabled: boolean
  currentSessionId?: string
  pendingSessionId?: string
  clientName: string
  labels: {
    selectAccount: string
    noAccounts: string
    noAccountsDescription: string
    currentAccount: string
  }
  onAction: (key: string | number) => void
}) => (
  <Card.Content className="px-4 pb-6 sm:px-6">
    {isLoading ? (
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    ) : !sessions?.length ? (
      <div className="flex flex-col items-center gap-1 py-6 text-center">
        <p className="text-sm font-semibold">{labels.noAccounts}</p>
        <p className="text-muted text-xs">
          {interpolateClient(labels.noAccountsDescription, clientName)}
        </p>
      </div>
    ) : (
      <ListBox
        className="divide-separator bg-surface-secondary divide-y rounded-lg p-0"
        aria-label={labels.selectAccount}
        disabledKeys={isDisabled ? sessions.map(item => item.session.id) : []}
        selectionMode="none"
        onAction={onAction}>
        {sessions.map(deviceSession => (
          <DeviceSessionRow
            key={deviceSession.session.id}
            deviceSession={deviceSession}
            isCurrent={deviceSession.session.id === currentSessionId}
            isPending={pendingSessionId === deviceSession.session.id}
            currentLabel={labels.currentAccount}
          />
        ))}
      </ListBox>
    )}
  </Card.Content>
)

/**
 * Account chooser for a signed OAuth authorization request.
 *
 * Switching accounts has to land before Better Auth resumes the request, so
 * picking a different session calls `multiSession.setActive()` first and only
 * then `oauth2.continue({ selected: true })`. Picking the account that is
 * already active skips the switch entirely.
 *
 * This screen deliberately has no sign-out or revoke actions — session
 * management belongs in security settings.
 */
export const OAuthSelectAccount = ({
  className,
  variant
}: OAuthSelectAccountProps) => {
  const { authClient } = useAuth<OAuthProviderMultiSessionAuthClient>()
  const { localization } = useAuthPlugin(oauthProviderPlugin)
  const oauthClient = authClient

  const { data: session, isPending: isSessionPending } = useSession(oauthClient)
  const search = useBrowserSearch()
  const request = search ? parseOAuthAuthorizationRequest(search) : undefined
  const [pendingSessionId, setPendingSessionId] = useState<string>()

  const publicClient = usePublicOAuthClient(oauthClient, request?.clientId, {
    enabled: Boolean(session && request?.clientId)
  })
  const { data: deviceSessions, isPending: isDeviceSessionsPending } =
    useListDeviceSessions(oauthClient)

  const client = publicClient.data
  const clientName = client?.client_name || localization.application
  const logoUrl = sanitizeOAuthClientUrl(client?.logo_uri)

  const setActiveSession = useSetActiveSession(oauthClient)
  const oauthContinue = useOAuthContinue(oauthClient)

  const requestResolved = request !== undefined
  const invalidRequest =
    requestResolved &&
    (!request.clientId ||
      (!isSessionPending && !session) ||
      publicClient.isError ||
      (!publicClient.isPending && session && !client))

  const cardClassName = cn('w-full max-w-md gap-5 md:p-6', className)

  const selectAccount = async (
    deviceSession: ListDeviceSession<OAuthProviderMultiSessionAuthClient>
  ) => {
    setPendingSessionId(deviceSession.session.id)

    try {
      if (deviceSession.session.id !== session?.session.id) {
        await setActiveSession.mutateAsync({
          sessionToken: deviceSession.session.token
        })
      }

      await oauthContinue.mutateAsync({ selected: true })
    } catch {
      // vx-bot/NOTE: The error toaster surfaces the failure; re-enable the rows so the
      // vx-bot/NOTE: user can pick again.
      setPendingSessionId(undefined)
    }
  }

  if (invalidRequest) {
    return (
      <Card className={cardClassName} variant={variant}>
        <Card.Header>
          <Card.Title className="text-xl font-semibold">
            {localization.invalidRequest}
          </Card.Title>
          <Card.Description>
            {localization.invalidRequestDescription}
          </Card.Description>
        </Card.Header>
      </Card>
    )
  }

  const isBusy = pendingSessionId !== undefined

  return (
    <Card
      className={cn(
        'max-h-[calc(100dvh-2rem)] w-full max-w-lg gap-0 overflow-y-auto p-0',
        className
      )}
      variant={variant}>
      <OAuthClientHeader
        clientName={clientName}
        description={interpolateClient(
          localization.selectAccountDescription,
          clientName
        )}
        isLoading={!client}
        logoUrl={logoUrl}
        title={localization.selectAccount}
      />
      <OAuthDeviceSessions
        sessions={deviceSessions}
        isLoading={isDeviceSessionsPending}
        isDisabled={isBusy || !client || isSessionPending}
        currentSessionId={session?.session.id}
        pendingSessionId={pendingSessionId}
        clientName={clientName}
        labels={{
          selectAccount: localization.selectAccount,
          noAccounts: localization.noAccounts,
          noAccountsDescription: localization.noAccountsDescription,
          currentAccount: localization.currentAccount
        }}
        onAction={key => {
          const deviceSession = deviceSessions?.find(
            candidate => candidate.session.id === String(key)
          )
          if (deviceSession) void selectAccount(deviceSession)
        }}
      />
    </Card>
  )
}
