import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type LinkSocialOptions,
  linkSocialOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for linking a social provider to the current user.
 */
export const useLinkSocial = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: LinkSocialOptions<TAuthClient>
) => {
  return useMutation({
    ...linkSocialOptions(authClient),
    ...options
  })
}
