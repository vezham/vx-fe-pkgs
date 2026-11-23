import { useMutation } from '@tanstack/react-query'

import {
  type PhoneNumberAuthClient,
  type SendPhoneNumberOtpOptions,
  sendPhoneNumberOtpOptions
} from '@vezham/auth-ui-core/plugins/phone-number'

/** Create a mutation for sending a phone verification code. */
export const useSendPhoneNumberOtp = <
  TAuthClient extends PhoneNumberAuthClient
>(
  authClient: TAuthClient,
  options?: SendPhoneNumberOtpOptions<TAuthClient>
) => {
  return useMutation({
    ...sendPhoneNumberOtpOptions(authClient),
    ...options
  })
}
