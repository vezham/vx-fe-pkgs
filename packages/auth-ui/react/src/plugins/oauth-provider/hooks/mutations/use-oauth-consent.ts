import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OAuthConsentOptions,
  type OAuthProviderAuthClient,
  oauthConsentOptions
} from '@vezham/auth-ui-core/plugins/oauth-provider'

export const useOAuthConsent = <TAuthClient extends OAuthProviderAuthClient>(
  authClient: TAuthClient,
  options?: OAuthConsentOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...oauthConsentOptions(authClient),
      ...options
    },
    queryClient
  )
}
