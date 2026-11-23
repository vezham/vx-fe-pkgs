import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type PhoneNumberAuthClient,
  type VerifyPhoneNumberOptions,
  verifyPhoneNumberOptions
} from '@vezham/auth-ui-core/plugins/phone-number'

/**
 * Create a mutation for verifying a phone-number code.
 *
 * Verification can create a session or update the current user's phone
 * number, so the session query is refreshed before success settles.
 */
export const useVerifyPhoneNumber = <TAuthClient extends PhoneNumberAuthClient>(
  authClient: TAuthClient,
  options?: VerifyPhoneNumberOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...verifyPhoneNumberOptions(authClient),
      ...options
    },
    queryClient
  )
}
