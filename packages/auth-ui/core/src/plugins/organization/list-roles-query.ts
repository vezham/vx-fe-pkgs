import { type QueryOptions, skipToken } from '@tanstack/query-core'

import type { InferData } from '../../lib/auth-client'
import { createAuthQueryFetchOptions } from '../../lib/auth-query-retry'
import { authRequestData } from '../../lib/auth-request-data'
import type { OrganizationRolesAuthClient } from './organization-auth-client'
import { organizationQueryKeys } from './organization-query-keys'

export type ListRolesData<
  TAuthClient extends OrganizationRolesAuthClient = OrganizationRolesAuthClient
> = InferData<TAuthClient['organization']['listRoles']>

export type ListRolesParams<
  TAuthClient extends OrganizationRolesAuthClient = OrganizationRolesAuthClient
> = Parameters<TAuthClient['organization']['listRoles']>[0]

export type ListedOrganizationRole<
  TAuthClient extends OrganizationRolesAuthClient = OrganizationRolesAuthClient
> = NonNullable<ListRolesData<TAuthClient>>[number]

export const listRolesOptions = <
  TAuthClient extends OrganizationRolesAuthClient
>(
  authClient: TAuthClient,
  userId?: string,
  params?: ListRolesParams<TAuthClient>
) => {
  const organizationId = params?.query?.organizationId

  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey: organizationQueryKeys.roles.list(userId, params?.query),
    queryFn:
      userId && organizationId
        ? ({ signal }) =>
            authRequestData<ListRolesData<TAuthClient>>(
              authClient.organization.listRoles({
                ...params,
                query: { ...params?.query, organizationId },
                fetchOptions: createAuthQueryFetchOptions(
                  params?.fetchOptions,
                  signal
                )
              })
            )
        : skipToken
  } satisfies QueryOptions
}
