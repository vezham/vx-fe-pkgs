import { type QueryOptions, skipToken } from '@tanstack/query-core'

import type { InferData } from '../../lib/auth-client'
import { createAuthQueryFetchOptions } from '../../lib/auth-query-retry'
import { authRequestData } from '../../lib/auth-request-data'
import type { OrganizationTeamsAuthClient } from './organization-auth-client'
import { organizationQueryKeys } from './organization-query-keys'

export type ListTeamMembersData<
  TAuthClient extends OrganizationTeamsAuthClient = OrganizationTeamsAuthClient
> = InferData<TAuthClient['organization']['listTeamMembers']>
export type ListTeamMembersParams<
  TAuthClient extends OrganizationTeamsAuthClient = OrganizationTeamsAuthClient
> = Parameters<TAuthClient['organization']['listTeamMembers']>[0]

export const listTeamMembersOptions = <
  TAuthClient extends OrganizationTeamsAuthClient
>(
  authClient: TAuthClient,
  userId?: string,
  params?: ListTeamMembersParams<TAuthClient>
) => {
  const query = params?.query
  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey: organizationQueryKeys.teams.members(userId, query?.teamId),
    queryFn:
      userId && query?.teamId
        ? ({ signal }) =>
            authRequestData<ListTeamMembersData<TAuthClient>>(
              authClient.organization.listTeamMembers({
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
