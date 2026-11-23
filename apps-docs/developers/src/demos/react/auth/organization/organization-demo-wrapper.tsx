// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import type { ReactNode } from 'react'

import { Auth } from '@vezham/react/auth'
import { Organization } from '@vezham/react/auth/plugins/organization'

import { useDemo } from '../demo-provider'

export const OrganizationDemoWrapper = ({
  children
}: {
  children: ReactNode
}) => {
  const { authClient, navigate } = useDemo()
  return (
    <Auth.Provider
      authClient={authClient}
      navigate={navigate}
      plugins={[Organization.plugin()]}>
      <div className="w-full">{children}</div>
    </Auth.Provider>
  )
}
