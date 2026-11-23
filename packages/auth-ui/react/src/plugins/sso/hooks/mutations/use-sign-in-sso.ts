import { useMutation } from '@tanstack/react-query'

import {
  type SignInSsoOptions,
  type SsoAuthClient,
  signInSsoOptions
} from '@vezham/auth-ui-core/plugins/sso'

/** Create a mutation for discovering and starting SSO sign-in. */
export const useSignInSso = <TAuthClient extends SsoAuthClient>(
  authClient: TAuthClient,
  options?: SignInSsoOptions<TAuthClient>
) => {
  return useMutation({
    ...signInSsoOptions(authClient),
    ...options
  })
}
