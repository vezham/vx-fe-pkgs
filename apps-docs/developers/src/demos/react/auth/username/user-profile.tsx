// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { Username } from '@vezham/react/auth/plugins/username'

import { useDemo } from '../demo-provider'

export const UserProfileUsernameDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[Username.plugin({ isUsernameAvailable: true })]}>
      <div className="w-full">
        <Auth.Settings.Account.Profile />
      </div>
    </Auth.Provider>
  )
}
