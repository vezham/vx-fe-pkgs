import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EnableTwoFactorOptions,
  type TwoFactorAuthClient,
  enableTwoFactorOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useEnableTwoFactor = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: EnableTwoFactorOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...enableTwoFactorOptions(authClient), ...options },
    queryClient
  )
}
