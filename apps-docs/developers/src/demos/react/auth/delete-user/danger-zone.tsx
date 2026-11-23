// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { DeleteUser } from '@vezham/react/auth/plugins/delete-user'

import { useDemo } from '../demo-provider'

export const DangerZoneDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[DeleteUser.plugin()]}
      socialProviders={['github', 'google']}>
      <div className="w-full">
        <DeleteUser.DangerZone />
      </div>
    </Auth.Provider>
  )
}
