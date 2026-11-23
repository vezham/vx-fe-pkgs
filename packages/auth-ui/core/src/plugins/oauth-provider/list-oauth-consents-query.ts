import {
  type QueryClient,
  type QueryOptions,
  skipToken
} from '@tanstack/query-core'

import type { InferData } from '../../lib/auth-client'
import { createAuthQueryFetchOptions } from '../../lib/auth-query-retry'
import { authRequestData } from '../../lib/auth-request-data'
import type { OAuthProviderAuthClient } from './oauth-provider-auth-client'
import { oauthProviderQueryKeys } from './oauth-provider-query-keys'

export type ListOAuthConsentsData<
  TAuthClient extends OAuthProviderAuthClient = OAuthProviderAuthClient
> = InferData<TAuthClient['oauth2']['getConsents']>

export type ListedOAuthConsent<
  TAuthClient extends OAuthProviderAuthClient = OAuthProviderAuthClient
> = NonNullable<ListOAuthConsentsData<TAuthClient>>[number]

export type ListOAuthConsentsParams<
  TAuthClient extends OAuthProviderAuthClient = OAuthProviderAuthClient
> = Parameters<TAuthClient['oauth2']['getConsents']>[0]

export type ListOAuthConsentsOptions<
  TAuthClient extends OAuthProviderAuthClient = OAuthProviderAuthClient
> = Omit<QueryOptions<ListOAuthConsentsData<TAuthClient>>, 'queryKey'> &
  ListOAuthConsentsParams<TAuthClient>

/**
 * Query options factory for the OAuth applications the user has authorized.
 *
 * @param authClient - The Better Auth client with the OAuth provider plugin.
 * @param userId - The signed-in user's ID. Used for cache partitioning.
 * @param params - Parameters forwarded to `oauth2.getConsents`.
 */
export const listOAuthConsentsOptions = <
  TAuthClient extends OAuthProviderAuthClient
>(
  authClient: TAuthClient,
  userId?: string,
  params?: ListOAuthConsentsParams<TAuthClient>
) => {
  type TData = ListOAuthConsentsData<TAuthClient>
  const queryKey = oauthProviderQueryKeys.listConsents(userId)

  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey,
    queryFn: userId
      ? ({ signal }) =>
          authRequestData<TData>(
            authClient.oauth2.getConsents({
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

export const ensureListOAuthConsents = <
  TAuthClient extends OAuthProviderAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  options?: ListOAuthConsentsOptions<TAuthClient>
) => {
  const { fetchOptions, ...queryOptions } = options ?? {}

  return queryClient.ensureQueryData({
    ...listOAuthConsentsOptions(authClient, userId, {
      fetchOptions
    }),
    ...queryOptions
  })
}

export const prefetchListOAuthConsents = <
  TAuthClient extends OAuthProviderAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  options?: ListOAuthConsentsOptions<TAuthClient>
) => {
  const { fetchOptions, ...queryOptions } = options ?? {}

  return queryClient.prefetchQuery({
    ...listOAuthConsentsOptions(authClient, userId, {
      fetchOptions
    }),
    ...queryOptions
  })
}

export const fetchListOAuthConsents = <
  TAuthClient extends OAuthProviderAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  options?: ListOAuthConsentsOptions<TAuthClient>
) => {
  const { fetchOptions, ...queryOptions } = options ?? {}

  return queryClient.fetchQuery({
    ...listOAuthConsentsOptions(authClient, userId, {
      fetchOptions
    }),
    ...queryOptions
  })
}

export const getListOAuthConsents = <
  TAuthClient extends OAuthProviderAuthClient = OAuthProviderAuthClient
>(
  queryClient: QueryClient,
  _authClient?: TAuthClient,
  userId?: string
) =>
  queryClient.getQueryData<ListOAuthConsentsData<TAuthClient>>(
    oauthProviderQueryKeys.listConsents(userId)
  )
