// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { Organization } from '@vezham/react/auth/plugins/organization'

import { useDemo } from '../demo-provider'

export const OrganizationSwitcherDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[Organization.plugin()]}>
      <Organization.Switcher placement="bottom" />
    </Auth.Provider>
  )
}
