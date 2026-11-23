import { type QueryOptions, skipToken } from '@tanstack/query-core'

import type {
  ManagedOAuthClient,
  OAuthClientManager,
  OAuthClientOwner
} from './oauth-client-manager'
import { oauthProviderQueryKeys } from './oauth-provider-query-keys'

export type OAuthClientsOptions = Omit<
  QueryOptions<ManagedOAuthClient[]>,
  'queryKey' | 'queryFn'
>

export const oauthClientsOptions = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string
) => {
  // eslint-disable-next-line @tanstack/query/exhaustive-deps -- Key factories include data params; transport options do not define cache identity.
  return {
    queryKey: oauthProviderQueryKeys.clients(ownerKey),
    queryFn: ownerKey
      ? async ({ signal }) =>
          (await manager.list(owner, signal)).map(
            ({ client_secret: _secret, ...client }) => {
              void _secret
              return client
            }
          )
      : skipToken
  } satisfies QueryOptions<ManagedOAuthClient[]>
}
