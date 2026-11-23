// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { MultiSession } from '@vezham/react/auth/plugins/multi-session'

import { useDemo } from '../demo-provider'

export const SwitchAccountSubmenuDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[MultiSession.plugin()]}
      socialProviders={['github', 'google']}>
      <Auth.User.Button />
    </Auth.Provider>
  )
}
