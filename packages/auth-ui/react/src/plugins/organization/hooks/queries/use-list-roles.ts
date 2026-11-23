import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type ListRolesData,
  type ListRolesParams,
  type OrganizationRolesAuthClient,
  listRolesOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseListRolesOptions<T extends OrganizationRolesAuthClient> = Omit<
  UseQueryOptions<ListRolesData<T>>,
  'queryKey'
> &
  ListRolesParams<T>

export const useListRoles = <T extends OrganizationRolesAuthClient>(
  authClient: T,
  options: UseListRolesOptions<T>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(
    {
      ...listRolesOptions(authClient, session?.user.id, {
        query,
        fetchOptions
      }),
      ...queryOptions
    },
    queryClient
  )
}
