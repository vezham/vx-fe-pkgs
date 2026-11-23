import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type SendTwoFactorOtpOptions,
  type TwoFactorAuthClient,
  sendTwoFactorOtpOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useSendTwoFactorOtp = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: SendTwoFactorOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...sendTwoFactorOtpOptions(authClient), ...options },
    queryClient
  )
}
