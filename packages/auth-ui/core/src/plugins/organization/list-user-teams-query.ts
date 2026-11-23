import { type QueryOptions, skipToken } from '@tanstack/query-core'

import type { InferData } from '../../lib/auth-client'
import { createAuthQueryFetchOptions } from '../../lib/auth-query-retry'
import { authRequestData } from '../../lib/auth-request-data'
import type { OrganizationTeamsAuthClient } from './organization-auth-client'
import { organizationQueryKeys } from './organization-query-keys'

export type ListUserTeamsData<
  TAuthClient extends OrganizationTeamsAuthClient = OrganizationTeamsAuthClient
> = InferData<TAuthClient['organization']['listUserTeams']>
export type ListUserTeamsParams<
  TAuthClient extends OrganizationTeamsAuthClient = OrganizationTeamsAuthClient
> = Parameters<TAuthClient['organization']['listUserTeams']>[0]
export type ListedUserTeam<
  TAuthClient extends OrganizationTeamsAuthClient = OrganizationTeamsAuthClient
> = NonNullable<ListUserTeamsData<TAuthClient>>[number]

export const listUserTeamsOptions = <
  TAuthClient extends OrganizationTeamsAuthClient
>(
  authClient: TAuthClient,
  userId?: string,
  params?: ListUserTeamsParams<TAuthClient>
) => {
  const query = params?.query

  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey: organizationQueryKeys.teams.userList(userId, params?.query),
    queryFn:
      userId && query?.organizationId
        ? ({ signal }) =>
            authRequestData<ListUserTeamsData<TAuthClient>>(
              authClient.organization.listUserTeams({
                ...params,
                fetchOptions: createAuthQueryFetchOptions(
                  params?.fetchOptions,
                  signal
                )
              })
            )
        : skipToken
  } satisfies QueryOptions
}
