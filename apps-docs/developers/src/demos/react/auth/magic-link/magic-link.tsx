// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { MagicLink } from '@vezham/react/auth/plugins/magic-link'

import { useDemo } from '../demo-provider'

export const MagicLinkDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[MagicLink.plugin()]}
      socialProviders={['github', 'google']}>
      <MagicLink />
    </Auth.Provider>
  )
}
