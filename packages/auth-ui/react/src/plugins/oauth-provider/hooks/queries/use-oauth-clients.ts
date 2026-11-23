import { type QueryClient, useQuery } from '@tanstack/react-query'

import {
  type OAuthClientManager,
  type OAuthClientOwner,
  oauthClientsOptions
} from '@vezham/auth-ui-core/plugins/oauth-provider'

/** Subscribe to OAuth clients for one explicitly partitioned owner. */
export const useOAuthClients = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string,
  queryClient?: QueryClient
) => {
  return useQuery(oauthClientsOptions(manager, owner, ownerKey), queryClient)
}
