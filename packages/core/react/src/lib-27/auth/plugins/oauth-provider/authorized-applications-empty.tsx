'use client'

import { oauthProviderPlugin } from '@vezham/auth-ui-core/plugins/oauth-provider'
import { useAuthPlugin } from '@vezham/auth-ui-react'
import { Shield } from '@vezham/icons-react'

export const AuthorizedApplicationsEmpty = () => {
  const { localization } = useAuthPlugin(oauthProviderPlugin)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
        <Shield size={16} className="size-4.5" />
      </div>

      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm font-semibold">
          {localization.noConnectedApplications}
        </p>

        <p className="text-muted text-xs">
          {localization.connectedApplicationsDescription}
        </p>
      </div>
    </div>
  )
}
