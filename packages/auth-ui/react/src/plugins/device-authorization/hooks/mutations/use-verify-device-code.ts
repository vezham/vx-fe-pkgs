import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type DeviceAuthorizationAuthClient,
  type VerifyDeviceCodeOptions,
  verifyDeviceCodeOptions
} from '@vezham/auth-ui-core/plugins/device-authorization'

export const useVerifyDeviceCode = <
  TAuthClient extends DeviceAuthorizationAuthClient
>(
  authClient: TAuthClient,
  options?: VerifyDeviceCodeOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...verifyDeviceCodeOptions(authClient),
      ...options
    },
    queryClient
  )
}
