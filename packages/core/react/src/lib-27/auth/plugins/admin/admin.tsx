'use client'

import { useMemo } from 'react'

import type { AdminView } from '@vezham/auth-ui-core'
import { adminPlugin } from '@vezham/auth-ui-core/plugins/admin'
import { useAuth, useAuthPlugin, useAuthenticate } from '@vezham/auth-ui-react'
import { Link, cn } from '@vezham/react-v3'

import { AdminUsers } from './admin-users'

export type AdminProps = {
  className?: string
  hideNav?: boolean
  path?: string
  view?: AdminView | (string & {})
}

/** Render a finite static administration route and plugin-contributed tabs. */
export const Admin = ({ className, hideNav, path, view }: AdminProps) => {
  const { authClient, basePaths, plugins, viewPaths } = useAuth()
  const { localization } = useAuthPlugin(adminPlugin)
  useAuthenticate(authClient)
  const tabs = useMemo(
    () => plugins.flatMap(plugin => plugin.adminTabs ?? []),
    [plugins]
  )

  if (!view && !path) {
    throw new Error('[Vezham Auth] Either `view` or `path` must be provided')
  }

  const currentView =
    view ??
    (viewPaths.admin.users === path ? 'users' : undefined) ??
    tabs.find(tab => tab.path === path)?.id
  const contributedView = tabs.find(tab => tab.id === currentView)

  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      {!hideNav && (
        <nav aria-label={localization.admin} className="flex gap-1 border-b">
          <Link
            className={cn(
              'rounded-lg px-3 py-2 text-sm',
              currentView === 'users' && 'bg-surface-secondary text-foreground'
            )}
            href={`${basePaths.admin}/${viewPaths.admin.users}`}>
            {localization.users}
          </Link>
          {tabs.map(tab => (
            <Link
              key={`${tab.id}-${tab.path}`}
              className={cn(
                'rounded-lg px-3 py-2 text-sm',
                currentView === tab.id && 'bg-surface-secondary text-foreground'
              )}
              href={`${basePaths.admin}/${tab.path}`}>
              {tab.label}
            </Link>
          ))}
        </nav>
      )}

      {currentView === 'users' ? (
        <AdminUsers />
      ) : contributedView ? (
        <contributedView.component />
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-8 text-center">
          <h2 className="font-semibold">{localization.unknownView}</h2>
          <p className="text-muted text-sm">
            {localization.unknownViewDescription} &quot;{path ?? view}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
