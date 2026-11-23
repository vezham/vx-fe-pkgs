import { useMutation } from '@tanstack/react-query'

import {
  type PhoneNumberAuthClient,
  type ResetPhoneNumberPasswordOptions,
  resetPhoneNumberPasswordOptions
} from '@vezham/auth-ui-core/plugins/phone-number'

/** Create a mutation for resetting a password with a phone code. */
export const useResetPhoneNumberPassword = <
  TAuthClient extends PhoneNumberAuthClient
>(
  authClient: TAuthClient,
  options?: ResetPhoneNumberPasswordOptions<TAuthClient>
) => {
  return useMutation({
    ...resetPhoneNumberPasswordOptions(authClient),
    ...options
  })
}
