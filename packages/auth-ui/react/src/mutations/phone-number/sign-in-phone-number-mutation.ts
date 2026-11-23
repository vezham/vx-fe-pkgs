import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type PhoneNumberAuthClient,
  type SignInPhoneNumberOptions,
  signInPhoneNumberOptions
} from '@vezham/auth-ui-core/plugins/phone-number'

/** Create a mutation for phone-number and password sign-in. */
export const useSignInPhoneNumber = <TAuthClient extends PhoneNumberAuthClient>(
  authClient: TAuthClient,
  options?: SignInPhoneNumberOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...signInPhoneNumberOptions(authClient),
      ...options
    },
    queryClient
  )
}
