import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OAuthPopupAuthClient,
  type SignInOAuthPopupOptions,
  signInOAuthPopupOptions
} from '@vezham/auth-ui-core'

/** Create a mutation for Better Auth's experimental OAuth popup flow. */
export const useSignInOAuthPopup = <TAuthClient extends OAuthPopupAuthClient>(
  authClient: TAuthClient,
  options?: SignInOAuthPopupOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...signInOAuthPopupOptions(authClient),
      ...options
    },
    queryClient
  )
}
