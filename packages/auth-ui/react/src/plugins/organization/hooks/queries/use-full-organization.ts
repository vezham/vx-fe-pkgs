import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type FullOrganizationData,
  type FullOrganizationParams,
  type OrganizationAuthClient,
  fullOrganizationOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

/**
 * Options for `useFullOrganization`, combining React Query options with core query parameters.
 */
export type UseFullOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<UseQueryOptions<FullOrganizationData<TAuthClient>>, 'queryKey'> &
  FullOrganizationParams<TAuthClient>

/**
 * React query hook for a full organization by query parameters.
 *
 * @param authClient - The Better Auth client.
 * @param options - Core query parameters and React Query options.
 * @param queryClient - Optional React Query client override.
 */
export const useFullOrganization = <TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options: UseFullOrganizationOptions<TAuthClient> = {},
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(
    {
      ...fullOrganizationOptions(authClient, userId, { query, fetchOptions }),
      ...queryOptions
    },
    queryClient
  )
}
