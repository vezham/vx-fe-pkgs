import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type DenyDeviceOptions,
  type DeviceAuthorizationAuthClient,
  denyDeviceOptions
} from '@vezham/auth-ui-core/plugins/device-authorization'

export const useDenyDevice = <
  TAuthClient extends DeviceAuthorizationAuthClient
>(
  authClient: TAuthClient,
  options?: DenyDeviceOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...denyDeviceOptions(authClient),
      ...options
    },
    queryClient
  )
}
