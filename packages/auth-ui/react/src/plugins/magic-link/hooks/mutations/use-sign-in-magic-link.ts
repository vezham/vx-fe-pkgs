import { useMutation } from '@tanstack/react-query'

import {
  type MagicLinkAuthClient,
  type SignInMagicLinkOptions,
  signInMagicLinkOptions
} from '@vezham/auth-ui-core/plugins/magic-link'

/**
 * Create a mutation for requesting a magic-link sign-in email.
 *
 * Wraps `authClient.signIn.magicLink` and forwards React Query mutation
 * options such as `onSuccess`, `onError`, and `retry`.
 *
 * @param authClient - The Better Auth client with the magic-link plugin.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useSignInMagicLink = <TAuthClient extends MagicLinkAuthClient>(
  authClient: TAuthClient,
  options?: SignInMagicLinkOptions<TAuthClient>
) => {
  return useMutation({
    ...signInMagicLinkOptions(authClient),
    ...options
  })
}
