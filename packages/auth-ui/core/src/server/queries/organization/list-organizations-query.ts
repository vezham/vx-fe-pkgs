import type { QueryClient, QueryOptions } from '@tanstack/query-core'

import type { APIError } from '@vezham/auth'

import { authRequestData, tagQueryKey } from '../../../lib/auth-request-data'
import { organizationQueryKeys } from '../../../plugins/organization'
import type { OrganizationAuthServer } from '../../../plugins/organization/server/organization-auth-server'

export type ListOrganizationsData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth['api']['listOrganizations']>>

export type ListOrganization<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = NonNullable<ListOrganizationsData<TAuth>>[number]

export type ListOrganizationsParams<TAuth extends OrganizationAuthServer> =
  Parameters<TAuth['api']['listOrganizations']>[0]

/**
 * Query options factory for organizations the current user belongs to.
 *
 * @param auth - The Better Auth server instance.
 * @param userId - The signed-in user's ID. Used for cache partitioning so
 *   the key matches the client-side `listOrganizationsOptions` for SSR hydration.
 * @param params - Parameters forwarded to `auth.api.listOrganizations`.
 */
export const listOrganizationsOptions = <TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) => {
  type TData = ListOrganizationsData<TAuth>
  const queryKey = organizationQueryKeys.list(userId, params?.query)

  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey: tagQueryKey<TData, APIError, typeof queryKey>(queryKey),
    queryFn: () => authRequestData<TData>(auth.api.listOrganizations(params))
  } satisfies QueryOptions<TData, APIError, TData, typeof queryKey>
}

export const ensureListOrganizations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) => queryClient.ensureQueryData(listOrganizationsOptions(auth, userId, params))

export const prefetchListOrganizations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) => queryClient.prefetchQuery(listOrganizationsOptions(auth, userId, params))

export const fetchListOrganizations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) => queryClient.fetchQuery(listOrganizationsOptions(auth, userId, params))
