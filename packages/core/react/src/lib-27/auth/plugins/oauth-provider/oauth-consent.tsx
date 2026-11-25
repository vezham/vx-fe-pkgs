'use client'

import { useSyncExternalStore } from 'react'
import type { ComponentProps } from 'react'

import {
  type OAuthProviderAuthClient,
  getOAuthAuthorizationDestination,
  oauthProviderPlugin,
  parseOAuthAuthorizationRequest,
  resolveOAuthScopeMetadata,
  sanitizeOAuthClientUrl
} from '@vezham/auth-ui-core/plugins/oauth-provider'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useOAuthConsent,
  usePublicOAuthClient
} from '@vezham/auth-ui-react/plugins/oauth-provider'
import {
  CheckRead as Check,
  MenuDots as Ellipsis,
  Link as LinkIcon,
  Shield,
  Stop as Square
} from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Card,
  type CardProps,
  Link,
  ScrollShadow,
  Separator,
  Skeleton,
  Spinner,
  Surface,
  cn
} from '@vezham/react-v3'

import { UserAvatar } from '../../user/user-avatar'

export type OAuthConsentProps = {
  className?: string
  /** The complete signed query. Pass it from your router for same-page navigation. */
  oauthQuery?: string
  variant?: CardProps['variant']
}

const subscribeToQuery = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

const interpolateClient = (template: string, clientName: string) =>
  template.replace('{{client}}', clientName)

type ConsentLabels = {
  applicationInformation: string
  authorize: string
  authorizationRequest: string
  privacyPolicy: string
  redirectTo: string
  requestedPermissions: string
  signedInAs: string
  termsOfService: string
}

type ConsentPermission = { description?: string; key: string; label: string }

const getConsentPermissions = (
  hasClient: boolean,
  request: ReturnType<typeof parseOAuthAuthorizationRequest> | undefined,
  scopeMetadata: Parameters<typeof resolveOAuthScopeMetadata>[0]
): ConsentPermission[] | undefined => {
  if (!hasClient || !request) return undefined

  return request.scopes.map(scope => {
    const metadata = resolveOAuthScopeMetadata(scopeMetadata, scope, {
      clientId: request.clientId,
      requestedScopes: request.scopes
    })
    return {
      description: metadata.description,
      key: scope,
      label: metadata.label
    }
  })
}

const ConsentActions = ({
  canRespond,
  cancelLabel,
  isAcceptPending,
  isCancelPending,
  onRespond,
  allowLabel
}: {
  canRespond: boolean
  cancelLabel: string
  isAcceptPending: boolean
  isCancelPending: boolean
  onRespond: (accept: boolean) => void
  allowLabel: string
}) => (
  <Card.Footer className="border-separator grid shrink-0 grid-cols-2 gap-3 border-t p-4 sm:p-6">
    <Button
      className="h-11 w-full"
      isDisabled={!canRespond}
      isPending={isCancelPending}
      variant="secondary"
      onPress={() => onRespond(false)}>
      {isCancelPending ? <Spinner color="current" size="sm" /> : null}
      {cancelLabel}
    </Button>
    <Button
      className="h-11 w-full"
      isDisabled={!canRespond}
      isPending={isAcceptPending}
      onPress={() => onRespond(true)}>
      {isAcceptPending ? <Spinner color="current" size="sm" /> : null}
      {allowLabel}
    </Button>
  </Card.Footer>
)

const ConsentBody = ({
  clientName,
  destination,
  hasClient,
  isSessionPending,
  labels,
  logoUrl,
  permissions,
  policyUrl,
  termsUrl,
  user
}: {
  clientName: string
  destination?: string
  hasClient: boolean
  isSessionPending: boolean
  labels: ConsentLabels
  logoUrl?: string
  permissions?: ConsentPermission[]
  policyUrl?: string
  termsUrl?: string
  user: ComponentProps<typeof UserAvatar>['user']
}) => (
  <ScrollShadow
    className="focus-visible:outline-focus min-h-0 overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2"
    role="region"
    aria-label={interpolateClient(labels.authorize, clientName)}
    tabIndex={0}>
    <Card.Header className="flex flex-col gap-5 p-6">
      <div className="flex items-center justify-center gap-5">
        {hasClient ? (
          <Avatar className="size-16 rounded-full">
            <Avatar.Image
              alt={clientName}
              referrerPolicy="no-referrer"
              src={logoUrl}
            />
            <Avatar.Fallback>
              <Square size={16} className="size-7" />
            </Avatar.Fallback>
          </Avatar>
        ) : (
          <Skeleton className="size-16 rounded-full" />
        )}
        <Ellipsis size={16} aria-hidden="true" className="text-muted size-5" />
        <UserAvatar
          className="size-16"
          isPending={isSessionPending}
          user={user}
        />
      </div>
      <div className="grid justify-items-center gap-1 text-center">
        <Card.Title className="max-w-full text-xl font-semibold break-words">
          {hasClient ? clientName : <Skeleton className="h-6 w-36" />}
        </Card.Title>
        <Card.Description>{labels.authorizationRequest}</Card.Description>
        <div className="text-muted mt-2 flex max-w-full flex-wrap justify-center gap-x-1 text-sm">
          <span>{labels.signedInAs}</span>
          {user ? (
            <span className="text-foreground font-medium break-all">
              {user.name || user.email}
            </span>
          ) : (
            <Skeleton className="h-4 w-32" />
          )}
        </div>
      </div>
    </Card.Header>

    <Card.Content className="px-4 pb-6 sm:px-6">
      <Surface
        variant="secondary"
        className="flex flex-col gap-5 rounded-lg p-5">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">
            {interpolateClient(labels.requestedPermissions, clientName)}
          </p>
          {permissions ? (
            <ul className="flex flex-col gap-3">
              {permissions.map(permission => (
                <li className="flex gap-3" key={permission.key}>
                  <Check
                    size={16}
                    aria-hidden="true"
                    className="text-muted mt-0.5 size-5 shrink-0"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-base leading-6 break-words">
                      {permission.label}
                    </p>
                    {permission.description ? (
                      <p className="text-muted text-sm leading-5">
                        {permission.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex gap-3">
              <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full max-w-64" />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {destination ? (
          <div className="text-muted flex gap-3 text-sm leading-5">
            <LinkIcon
              size={16}
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
            />
            <p>
              {labels.redirectTo}{' '}
              <span className="text-foreground block font-medium break-all">
                {destination}
              </span>
            </p>
          </div>
        ) : null}
        {policyUrl || termsUrl ? (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {policyUrl ? (
              <Link href={policyUrl} rel="noreferrer" target="_blank">
                {labels.privacyPolicy}
              </Link>
            ) : null}
            {termsUrl ? (
              <Link href={termsUrl} rel="noreferrer" target="_blank">
                {labels.termsOfService}
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="text-muted flex gap-3 text-sm leading-5">
          <Shield
            size={16}
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0"
          />
          <p>{labels.applicationInformation}</p>
        </div>
      </Surface>
    </Card.Content>
  </ScrollShadow>
)

const isInvalidOAuthRequest = ({
  hasClient,
  hasClientId,
  hasRequest,
  hasSession,
  isClientError,
  isClientFetching,
  isClientPending,
  isSessionPending
}: {
  hasClient: boolean
  hasClientId: boolean
  hasRequest: boolean
  hasSession: boolean
  isClientError: boolean
  isClientFetching: boolean
  isClientPending: boolean
  isSessionPending: boolean
}) => {
  if (!hasRequest) return false
  if (!hasClientId || isClientError) return true
  if (!isSessionPending && !hasSession) return true
  return !isClientPending && !isClientFetching && hasSession && !hasClient
}

const canRespondToOAuthRequest = ({
  hasClient,
  hasClientId,
  hasSession,
  isPending
}: {
  hasClient: boolean
  hasClientId: boolean
  hasSession: boolean
  isPending: boolean
}) => hasClientId && hasSession && hasClient && !isPending

export const OAuthConsent = ({
  className,
  variant,
  oauthQuery
}: OAuthConsentProps) => {
  const { authClient } = useAuth<OAuthProviderAuthClient>()
  const { localization, scopeMetadata } = useAuthPlugin(oauthProviderPlugin)
  const oauthClient = authClient
  const { data: session, isPending: isSessionPending } = useSession(oauthClient)
  const browserQuery = useSyncExternalStore(
    subscribeToQuery,
    () => window.location.search,
    () => undefined
  )
  const query = oauthQuery ?? browserQuery
  const request =
    query === undefined ? undefined : parseOAuthAuthorizationRequest(query)
  const publicClient = usePublicOAuthClient(oauthClient, request?.clientId, {
    enabled: Boolean(session && request?.clientId),
    oauthQuery: query,
    retry: false,
    staleTime: 0,
    gcTime: 0
  })
  const consent = useOAuthConsent(oauthClient)
  const client =
    !publicClient.isFetching && !publicClient.isError
      ? publicClient.data
      : undefined
  const destination =
    client && query ? getOAuthAuthorizationDestination(query) : undefined
  const clientName = client?.client_name || localization.application
  const logoUrl = sanitizeOAuthClientUrl(client?.logo_uri)
  const policyUrl = sanitizeOAuthClientUrl(client?.policy_uri)
  const termsUrl = sanitizeOAuthClientUrl(client?.tos_uri)
  const invalidRequest = isInvalidOAuthRequest({
    hasClient: Boolean(client),
    hasClientId: Boolean(request?.clientId),
    hasRequest: Boolean(request),
    hasSession: Boolean(session),
    isClientError: publicClient.isError,
    isClientFetching: publicClient.isFetching,
    isClientPending: publicClient.isPending,
    isSessionPending
  })
  const canRespond = canRespondToOAuthRequest({
    hasClient: Boolean(client),
    hasClientId: Boolean(request?.clientId),
    hasSession: Boolean(session),
    isPending: consent.isPending
  })
  const cardClassName = cn('w-full max-w-md gap-5 md:p-6', className)

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

  return (
    <Card
      className={cn(
        'max-h-[calc(100dvh-2rem)] w-full max-w-lg gap-0 overflow-hidden p-0',
        className
      )}
      variant={variant}>
      <ConsentBody
        clientName={clientName}
        destination={destination}
        hasClient={Boolean(client)}
        isSessionPending={isSessionPending}
        labels={localization}
        logoUrl={logoUrl}
        permissions={getConsentPermissions(
          Boolean(client),
          request,
          scopeMetadata
        )}
        policyUrl={policyUrl}
        termsUrl={termsUrl}
        user={session?.user}
      />

      <ConsentActions
        canRespond={canRespond}
        cancelLabel={localization.cancel}
        isAcceptPending={
          consent.isPending && consent.variables?.accept === true
        }
        isCancelPending={
          consent.isPending && consent.variables?.accept !== true
        }
        onRespond={accept => consent.mutate({ accept, oauth_query: query })}
        allowLabel={localization.allow}
      />
    </Card>
  )
}
