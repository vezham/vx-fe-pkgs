// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { MultiSession } from '@vezham/react/auth/plugins/multi-session'

import { useDemo } from '../demo-provider'

export const ManageAccountsDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[MultiSession.plugin()]}>
      <div className="w-full">
        <MultiSession />
      </div>
    </Auth.Provider>
  )
}
