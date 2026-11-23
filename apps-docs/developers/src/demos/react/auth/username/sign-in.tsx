// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { Username } from '@vezham/react/auth/plugins/username'

import { useDemo } from '../demo-provider'

export const SignInUsernameDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[Username.plugin({ isUsernameAvailable: true })]}>
      <Username />
    </Auth.Provider>
  )
}
