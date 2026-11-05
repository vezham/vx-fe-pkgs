import {
  Outlet,
  useLocation,
  useMatches,
  useNavigate
} from '@tanstack/react-router'
import { type ReactElement, type ReactNode, useCallback } from 'react'

import { useApp } from '@vezham/hooks'
import { toast } from '@vezham/react-v3'
import {
  TamizhiSessionProvider,
  type TamizhiSessionProviderProps
} from '@vezham/tamizhi-ui'

import { type AppMenuItem, AppMenuProvider } from '../../components/app-menu'
import { CommandProvider } from '../../components/command'
import { MobileControlsProvider } from '../../components/mobile-controls'
import { ConfiguredControlCenter } from '../../components/panel/footer/control-center/configured'
import type {
  ControlCenterConfig,
  ControlCenterI18n
} from '../../components/panel/footer/control-center/types'
import { InfoPanelProvider } from '../../components/panel/info-panel'
import { ResponsiveToolbarActionProvider } from '../../components/responsive-toolbar-action'
import {
  ToolbarActionsProvider,
  useToolbarActions
} from '../../components/toolbar-actions'
import { WorkspaceNavigationProvider } from '../../components/workspace-navigation'
import type { AppNavigationItem } from '../../navigation'
import { getNavigationPageKey } from '../../navigation'
import {
  SettingsNavigationContext,
  type SettingsSection
} from '../../pages/settings/navigation'
import {
  type User,
  UserProvider,
  useUser
} from '../../store/users/useUserStore'
import { WorkspaceProvider, useOptionalWorkspace } from '../../workspace'
import { MenuLayout } from '../menu-layout'
import { SettingsLayout } from '../settings'
import { AppFrame, type AppFrameProps } from './frame'

export type AppLayoutProps = {
  tamizhi?: Pick<TamizhiSessionProviderProps, 'client' | 'appId' | 'profiles'>
} & Omit<AppFrameProps, 'navigation' | 'children' | 'hasBottomNavigation'> & {
    children?: ReactNode
    navigationItems: AppNavigationItem[]
    appMenu?: AppMenuItem[]
    user?: User | null
    settings?: boolean
    controlCenter?: ControlCenterConfig
    controlCenterSlot?: ReactElement
    i18n?: ControlCenterI18n
  }

type AppLayoutViewProps = Omit<
  AppFrameProps,
  'navigation' | 'hasBottomNavigation'
> & {
  navigationItems: AppNavigationItem[]
  controlCenterSlot?: ReactElement
}

export const AppLayoutProviders = ({
  children,
  navigationItems,
  appMenu = [],
  user,
  tamizhi
}: Pick<
  AppLayoutProps,
  'children' | 'navigationItems' | 'appMenu' | 'user' | 'tamizhi'
>) => (
  <ToolbarActionsProvider>
    <AppMenuShell items={appMenu} navigationItems={navigationItems}>
      <AppWorkspaces>
        <UserProvider initialUser={user}>
          <CommandProvider items={navigationItems}>
            <InfoPanelProvider>
              <EmbeddedSession {...tamizhi}>
                <WorkspaceNavigationProvider>
                  <MobileControlsProvider>
                    <ResponsiveToolbarActionProvider>
                      {children}
                    </ResponsiveToolbarActionProvider>
                  </MobileControlsProvider>
                </WorkspaceNavigationProvider>
              </EmbeddedSession>
            </InfoPanelProvider>
          </CommandProvider>
        </UserProvider>
      </AppWorkspaces>
    </AppMenuShell>
  </ToolbarActionsProvider>
)

const AppWorkspaces = ({ children }: { children: ReactNode }) => {
  const app = useApp()
  const workspace = useOptionalWorkspace()
  if (workspace || !app?.id) return children
  return <WorkspaceProvider appId={app.id}>{children}</WorkspaceProvider>
}

export const AppLayoutView = ({
  children,
  navigationItems,
  controlCenterSlot,
  ...frameProps
}: AppLayoutViewProps) => (
  <AppFrame
    {...frameProps}
    hasBottomNavigation={navigationItems.length > 1}
    navigation={
      <MenuLayout items={navigationItems} controlCenter={controlCenterSlot} />
    }>
    {children}
  </AppFrame>
)

const AppLayout = ({
  children,
  navigationItems,
  appMenu,
  user,
  settings = false,
  controlCenter,
  controlCenterSlot,
  tamizhi,
  i18n,
  ...frameProps
}: AppLayoutProps) => {
  const navigate = useNavigate()
  const isSettings = useMatches({
    select: matches =>
      settings && matches.some(match => match.routeId === '/settings')
  })
  const openSettings = useCallback(
    (section: SettingsSection) =>
      navigate({ to: '/settings', search: { section } }),
    [navigate]
  )
  const content = children === undefined ? <Outlet /> : children
  const center =
    controlCenterSlot !== undefined ? (
      controlCenterSlot
    ) : controlCenter ? (
      <ConfiguredControlCenter
        config={controlCenter}
        context={{ i18n }}
        placement="right bottom"
        preview
      />
    ) : undefined
  return (
    <AppLayoutProviders
      navigationItems={navigationItems}
      appMenu={appMenu}
      user={user}
      tamizhi={tamizhi}>
      <SettingsNavigationContext.Provider
        value={settings ? openSettings : null}>
        {isSettings ? (
          <SettingsLayout>{content}</SettingsLayout>
        ) : (
          <AppLayoutView
            {...frameProps}
            navigationItems={navigationItems}
            controlCenterSlot={center}>
            {content}
          </AppLayoutView>
        )}
      </SettingsNavigationContext.Provider>
    </AppLayoutProviders>
  )
}

const AppMenuShell = ({
  items,
  navigationItems,
  children
}: {
  items: AppMenuItem[]
  navigationItems: AppNavigationItem[]
  children: ReactNode
}) => {
  const { pathname } = useLocation()
  const { emit } = useToolbarActions()
  const pageKey = getNavigationPageKey(navigationItems, pathname)
  const onAction = useCallback(
    (action: AppMenuItem['groups'][number][number]) => {
      if (!emit({ actionKey: action.key, pageKey, pathname })) {
        toast.info(
          `TODO: ${action.label.replace(/…$/, '')} is not implemented yet.`
        )
      }
    },
    [emit, pageKey, pathname]
  )
  return (
    <AppMenuProvider items={items} onAction={onAction}>
      {children}
    </AppMenuProvider>
  )
}

export { AppLayout }
export { AppFrame } from './frame'
export type { AppFrameProps } from './frame'

const EmbeddedSession = ({
  children,
  client,
  appId,
  profiles
}: Pick<
  TamizhiSessionProviderProps,
  'children' | 'client' | 'appId' | 'profiles'
>) => {
  const { user } = useUser()
  const app = useApp()
  const workspace = useOptionalWorkspace()
  const scope = workspace ? `.workspace.${workspace.active.id}` : ''
  const storageKey = `tamizhi.embed.${user?.id ?? 'guest'}${scope}.v1`
  return (
    <TamizhiSessionProvider
      key={storageKey}
      storageKey={storageKey}
      client={client}
      appId={appId ?? app?.id}
      profiles={profiles}>
      {children}
    </TamizhiSessionProvider>
  )
}
