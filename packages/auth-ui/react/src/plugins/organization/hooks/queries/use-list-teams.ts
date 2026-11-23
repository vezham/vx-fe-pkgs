import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type ListTeamsData,
  type ListTeamsParams,
  type OrganizationTeamsAuthClient,
  listTeamsOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseListTeamsOptions<T extends OrganizationTeamsAuthClient> = Omit<
  UseQueryOptions<ListTeamsData<T>>,
  'queryKey'
> &
  ListTeamsParams<T>
export const useListTeams = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options: UseListTeamsOptions<T>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const { query, fetchOptions, ...queryOptions } = options
  return useQuery(
    {
      ...listTeamsOptions(authClient, session?.user.id, {
        query,
        fetchOptions
      }),
      ...queryOptions
    },
    queryClient
  )
}
