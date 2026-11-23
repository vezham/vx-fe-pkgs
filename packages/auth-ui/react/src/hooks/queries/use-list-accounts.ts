import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type AuthClient,
  type ListAccountsData,
  type ListAccountsParams,
  listAccountsOptions
} from '@vezham/auth-ui-core'

import { useSession } from './use-session'

export type UseListAccountsOptions<TAuthClient extends AuthClient> = Omit<
  UseQueryOptions<ListAccountsData<TAuthClient>>,
  'queryKey'
> &
  ListAccountsParams<TAuthClient>

/**
 * Subscribe to the current user's linked social accounts via TanStack Query.
 */
export const useListAccounts = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseListAccountsOptions<TAuthClient> = {},
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(
    {
      ...listAccountsOptions(authClient, userId, {
        query,
        fetchOptions
      }),
      ...queryOptions
    },
    queryClient
  )
}
