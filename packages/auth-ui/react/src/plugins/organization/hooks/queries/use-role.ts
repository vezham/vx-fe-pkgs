import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type OrganizationRoleData,
  type OrganizationRoleParams,
  type OrganizationRolesAuthClient,
  roleOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseRoleOptions<T extends OrganizationRolesAuthClient> = Omit<
  UseQueryOptions<OrganizationRoleData<T>>,
  'queryKey'
> &
  OrganizationRoleParams<T>

export const useRole = <T extends OrganizationRolesAuthClient>(
  authClient: T,
  options: UseRoleOptions<T>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(
    {
      ...roleOptions(authClient, session?.user.id, { query, fetchOptions }),
      ...queryOptions
    },
    queryClient
  )
}
