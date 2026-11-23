import type { QueryClient, QueryOptions } from '@tanstack/query-core'

import type { InferData } from '../../lib/auth-client'
import { createAuthQueryFetchOptions } from '../../lib/auth-query-retry'
import { authRequestData } from '../../lib/auth-request-data'
import type { OrganizationAuthClient } from './organization-auth-client'
import { organizationQueryKeys } from './organization-query-keys'

export type InvitationData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient['organization']['getInvitation']>

export type InvitationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient['organization']['getInvitation']>[0]

export type InvitationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<QueryOptions<InvitationData<TAuthClient>>, 'queryKey'> &
  InvitationParams<TAuthClient>

export const invitationOptions = <TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  userId: string | undefined,
  params: InvitationParams<TAuthClient>
) => {
  type TData = InvitationData<TAuthClient>
  const queryKey = organizationQueryKeys.invitations.detail(
    userId,
    params.query
  )

  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey,
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      authRequestData<TData>(
        authClient.organization.getInvitation({
          ...params,
          fetchOptions: createAuthQueryFetchOptions(params.fetchOptions, signal)
        })
      )
  } satisfies QueryOptions<TData>
}

export const ensureInvitation = <TAuthClient extends OrganizationAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  options: InvitationOptions<TAuthClient>
) => {
  const { query, fetchOptions, ...queryOptions } = options

  return queryClient.ensureQueryData({
    ...invitationOptions(authClient, userId, { query, fetchOptions }),
    ...queryOptions
  })
}

export const prefetchInvitation = <TAuthClient extends OrganizationAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  options: InvitationOptions<TAuthClient>
) => {
  const { query, fetchOptions, ...queryOptions } = options

  return queryClient.prefetchQuery({
    ...invitationOptions(authClient, userId, { query, fetchOptions }),
    ...queryOptions
  })
}

export const fetchInvitation = <TAuthClient extends OrganizationAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  options: InvitationOptions<TAuthClient>
) => {
  const { query, fetchOptions, ...queryOptions } = options

  return queryClient.fetchQuery({
    ...invitationOptions(authClient, userId, { query, fetchOptions }),
    ...queryOptions
  })
}
