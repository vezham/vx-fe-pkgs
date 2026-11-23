// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { DeviceAuthorization } from '@vezham/react/auth/plugins/device-authorization'

import { useDemo } from '../demo-provider'

export const DeviceAuthorizationDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[DeviceAuthorization.plugin()]}>
      <DeviceAuthorization />
    </Auth.Provider>
  )
}
