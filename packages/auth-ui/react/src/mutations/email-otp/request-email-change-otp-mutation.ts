import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EmailOtpAuthClient,
  type RequestEmailChangeOtpOptions,
  requestEmailChangeOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useRequestEmailChangeOtp = <
  TAuthClient extends EmailOtpAuthClient
>(
  authClient: TAuthClient,
  options?: RequestEmailChangeOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...requestEmailChangeOtpOptions(authClient), ...options },
    queryClient
  )
}
