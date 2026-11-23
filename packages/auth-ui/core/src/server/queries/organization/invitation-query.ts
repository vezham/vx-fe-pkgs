import type { QueryClient, QueryOptions } from '@tanstack/query-core'

import type { APIError } from '@vezham/auth'

import { authRequestData, tagQueryKey } from '../../../lib/auth-request-data'
import { organizationQueryKeys } from '../../../plugins/organization'
import type { OrganizationAuthServer } from '../../../plugins/organization/server/organization-auth-server'

export type InvitationData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth['api']['getInvitation']>>

export type InvitationParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Parameters<TAuth['api']['getInvitation']>[0]

/** Query options for an invitation addressed to the signed-in user. */
export const invitationOptions = <TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: InvitationParams<TAuth>
) => {
  type TData = InvitationData<TAuth>
  const queryKey = organizationQueryKeys.invitations.detail(
    userId,
    params?.query
  )

  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey: tagQueryKey<TData, APIError, typeof queryKey>(queryKey),
    queryFn: () => authRequestData<TData>(auth.api.getInvitation(params))
  } satisfies QueryOptions<TData, APIError, TData, typeof queryKey>
}

export const ensureInvitation = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: InvitationParams<TAuth>
) => queryClient.ensureQueryData(invitationOptions(auth, userId, params))

export const prefetchInvitation = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: InvitationParams<TAuth>
) => queryClient.prefetchQuery(invitationOptions(auth, userId, params))

export const fetchInvitation = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: InvitationParams<TAuth>
) => queryClient.fetchQuery(invitationOptions(auth, userId, params))
