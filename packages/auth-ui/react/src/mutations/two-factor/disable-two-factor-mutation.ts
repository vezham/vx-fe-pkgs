import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type DisableTwoFactorOptions,
  type TwoFactorAuthClient,
  disableTwoFactorOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useDisableTwoFactor = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: DisableTwoFactorOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...disableTwoFactorOptions(authClient), ...options },
    queryClient
  )
}
