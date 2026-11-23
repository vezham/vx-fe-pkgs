// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { ApiKey } from '@vezham/react/auth/plugins/api-key'

import { useDemo } from '../demo-provider'

export const ApiKeysDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[ApiKey.plugin()]}>
      <div className="w-full">
        <ApiKey />
      </div>
    </Auth.Provider>
  )
}
