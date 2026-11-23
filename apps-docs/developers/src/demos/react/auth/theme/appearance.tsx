// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'
import { AuthTheme } from '@vezham/react/auth/plugins/theme'

import { useDemo, useDemoTheme as useTheme } from '../demo-provider'

export const AppearanceDemo = () => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[AuthTheme.plugin({ useTheme })]}>
      <div className="w-full">
        <AuthTheme />
      </div>
    </Auth.Provider>
  )
}
