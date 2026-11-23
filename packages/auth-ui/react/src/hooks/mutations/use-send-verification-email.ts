import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type SendVerificationEmailOptions,
  sendVerificationEmailOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for sending an email-verification link.
 */
export const useSendVerificationEmail = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: SendVerificationEmailOptions<TAuthClient>
) => {
  return useMutation({
    ...sendVerificationEmailOptions(authClient),
    ...options
  })
}
