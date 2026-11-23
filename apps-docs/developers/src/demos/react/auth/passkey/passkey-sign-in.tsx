// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { Passkey } from '@vezham/react/auth/plugins/passkey'

import { useDemo } from '../demo-provider'

export const PasskeySignInDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[Passkey.plugin()]}
      socialProviders={['github', 'google']}>
      <Auth.SignIn />
    </Auth.Provider>
  )
}
