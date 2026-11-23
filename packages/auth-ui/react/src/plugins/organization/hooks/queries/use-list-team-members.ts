import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type ListTeamMembersData,
  type ListTeamMembersParams,
  type OrganizationTeamsAuthClient,
  listTeamMembersOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseListTeamMembersOptions<T extends OrganizationTeamsAuthClient> =
  Omit<UseQueryOptions<ListTeamMembersData<T>>, 'queryKey'> &
    ListTeamMembersParams<T>
export const useListTeamMembers = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options: UseListTeamMembersOptions<T>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const { query, fetchOptions, ...queryOptions } = options
  return useQuery(
    {
      ...listTeamMembersOptions(authClient, session?.user.id, {
        query,
        fetchOptions
      }),
      ...queryOptions
    },
    queryClient
  )
}
