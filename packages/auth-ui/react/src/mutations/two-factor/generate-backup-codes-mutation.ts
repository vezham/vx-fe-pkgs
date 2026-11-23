import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type GenerateBackupCodesOptions,
  type TwoFactorAuthClient,
  generateBackupCodesOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useGenerateBackupCodes = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: GenerateBackupCodesOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...generateBackupCodesOptions(authClient), ...options },
    queryClient
  )
}
