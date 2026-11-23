import { useMutation } from '@tanstack/react-query'

import {
  type PhoneNumberAuthClient,
  type RequestPhoneNumberPasswordResetOptions,
  requestPhoneNumberPasswordResetOptions
} from '@vezham/auth-ui-core/plugins/phone-number'

/** Create a mutation for sending a phone password-reset code. */
export const useRequestPhoneNumberPasswordReset = <
  TAuthClient extends PhoneNumberAuthClient
>(
  authClient: TAuthClient,
  options?: RequestPhoneNumberPasswordResetOptions<TAuthClient>
) => {
  return useMutation({
    ...requestPhoneNumberPasswordResetOptions(authClient),
    ...options
  })
}
