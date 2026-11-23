import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type ListOAuthConsentsData,
  type ListOAuthConsentsParams,
  type OAuthProviderAuthClient,
  listOAuthConsentsOptions
} from '@vezham/auth-ui-core/plugins/oauth-provider'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseListOAuthConsentsOptions<
  TAuthClient extends OAuthProviderAuthClient
> = Omit<UseQueryOptions<ListOAuthConsentsData<TAuthClient>>, 'queryKey'> &
  ListOAuthConsentsParams<TAuthClient>

/**
 * Subscribe to the OAuth applications the signed-in user has authorized.
 */
export const useListOAuthConsents = <
  TAuthClient extends OAuthProviderAuthClient
>(
  authClient: TAuthClient,
  options: UseListOAuthConsentsOptions<TAuthClient> = {},
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const { fetchOptions, ...queryOptions } = options

  return useQuery(
    {
      ...listOAuthConsentsOptions(authClient, session?.user.id, {
        fetchOptions
      }),
      ...queryOptions
    },
    queryClient
  )
}
