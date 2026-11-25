import { type ComponentProps, type ReactNode, useEffect, useMemo } from 'react'

import type {
  OrganizationAuthClient,
  OrganizationView,
  OrganizationViewPaths
} from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useAuthenticate } from '@vezham/auth-ui-react'
import {
  useActiveOrganization,
  useHasPermission
} from '@vezham/auth-ui-react/plugins/organization'
import {
  Settings as Gear,
  User as Person,
  UsersGroupRounded as Persons,
  Shield
} from '@vezham/icons-react'
import { type CardProps, Tabs, cn } from '@vezham/react-v3'

import { OrganizationPeople } from './organization-people'
import { OrganizationRoles } from './organization-roles'
import { OrganizationSettings } from './organization-settings'
import { OrganizationTeams } from './organization-teams'

export type OrganizationProps = {
  className?: string
  hideNav?: boolean
  path?: string
  variant?: CardProps['variant']
  /** Built-in view name or a plugin-contributed organization tab id. */
  view?: OrganizationView | (string & {})
}

const resolveOrganizationView = ({
  extensionTabs,
  path,
  paths,
  rolesEnabled,
  view
}: {
  extensionTabs: Array<{ id: string; path: string }>
  path?: string
  paths: OrganizationViewPaths
  rolesEnabled: boolean
  view?: string
}) => {
  if (view) return view === 'roles' && !rolesEnabled ? undefined : view

  const routes = Object.entries(paths).filter(
    ([name]) => rolesEnabled || name !== 'roles'
  )
  return [
    ...routes,
    ...extensionTabs.map(tab => [tab.id, tab.path] as const)
  ].find(([, segment]) => segment === path)?.[0]
}

const getOrganizationHref = (
  basePath: string,
  slugPrefix: string,
  slug: string | null | undefined,
  path: string
) => (slug ? `${basePath}/${slugPrefix}${slug}/${path}` : `${basePath}/${path}`)

const getOrganizationSelectedView = (
  currentView: string,
  canReadRoles: boolean
) => (currentView === 'roles' && !canReadRoles ? 'settings' : currentView)

type OrganizationExtensionTab = {
  id: string
  label: ReactNode
  path: string
}

const OrganizationNavigation = ({
  basePath,
  canReadRoles,
  extensionTabs,
  hideNav,
  labels,
  paths,
  rolesEnabled,
  slug,
  slugPrefix,
  teams
}: {
  basePath: string
  canReadRoles: { data?: { success?: boolean } | null; isPending: boolean }
  extensionTabs: OrganizationExtensionTab[]
  hideNav: boolean
  labels: { people: string; roles: string; settings: string; teams: string }
  paths: OrganizationViewPaths
  rolesEnabled: boolean
  slug?: string | null
  slugPrefix: string
  teams: boolean
}) => {
  if (hideNav) return null

  return (
    <Tabs.ListContainer>
      <Tabs.List
        aria-label={labels.settings}
        className="max-w-fit [scrollbar-width:none] overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Tabs.Tab
          id="settings"
          href={getOrganizationHref(basePath, slugPrefix, slug, paths.settings)}
          className="gap-2"
          onPress={event =>
            event.target.scrollIntoView({
              behavior: 'smooth',
              inline: 'center'
            })
          }>
          <Gear size={16} className="text-muted" />
          {labels.settings}
          <Tabs.Indicator />
        </Tabs.Tab>
        {teams ? (
          <Tabs.Tab
            id="teams"
            href={getOrganizationHref(basePath, slugPrefix, slug, paths.teams)}
            className="gap-2">
            <Persons size={16} className="text-muted" />
            {labels.teams}
            <Tabs.Indicator />
          </Tabs.Tab>
        ) : null}
        {rolesEnabled ? (
          <Tabs.Tab
            id="roles"
            isDisabled={canReadRoles.isPending || !canReadRoles.data?.success}
            href={getOrganizationHref(basePath, slugPrefix, slug, paths.roles)}
            className="gap-2">
            <Shield size={16} className="text-muted" />
            {labels.roles}
            <Tabs.Indicator />
          </Tabs.Tab>
        ) : null}
        {extensionTabs.map(tab => (
          <Tabs.Tab
            id={tab.id}
            key={tab.id}
            href={getOrganizationHref(basePath, slugPrefix, slug, tab.path)}
            className="gap-2">
            {tab.label}
            <Tabs.Indicator />
          </Tabs.Tab>
        ))}
        <Tabs.Tab
          id="people"
          href={getOrganizationHref(basePath, slugPrefix, slug, paths.people)}
          className="gap-2"
          onPress={event =>
            event.target.scrollIntoView({
              behavior: 'smooth',
              inline: 'center'
            })
          }>
          <Person size={16} className="text-muted" />
          {labels.people}
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
  )
}

/**
 * Organization management shell: tabs for profile / danger zone and for
 * people (members / invitations). Path segments come from
 * `useAuthPlugin(organizationPlugin).viewPaths.organization`.
 */
export const Organization = ({
  className,
  hideNav,
  path,
  variant,
  view,
  ...props
}: OrganizationProps & ComponentProps<'div'>) => {
  if (!view && !path) {
    throw new Error('[Vezham Auth] Either `view` or `path` must be provided')
  }

  const { authClient, basePaths, localization, navigate, plugins } =
    useAuth<OrganizationAuthClient>()
  useAuthenticate(authClient)

  const {
    localization: organizationLocalization,
    viewPaths: organizationViewPaths,
    slug,
    slugPrefix,
    teams,
    dynamicAccessControl
  } = useAuthPlugin(organizationPlugin)

  const { data: activeOrganization, isPending } =
    useActiveOrganization(authClient)
  const extensionTabs = useMemo(
    () => plugins.flatMap(plugin => plugin.organizationTabs ?? []),
    [plugins]
  )
  const rolesEnabled = dynamicAccessControl?.enabled === true
  const canReadRoles = useHasPermission(authClient, {
    organizationId: activeOrganization?.id,
    permissions: { ac: ['read'] },
    enabled: rolesEnabled && Boolean(activeOrganization?.id)
  })

  useEffect(() => {
    if (!isPending && !activeOrganization) {
      navigate({
        to: `${basePaths.settings}/${organizationViewPaths.settings?.organizations}`,
        replace: true
      })
    }
  }, [
    basePaths.settings,
    isPending,
    navigate,
    organizationViewPaths.settings?.organizations,
    activeOrganization
  ])

  const currentView = useMemo(
    () =>
      resolveOrganizationView({
        extensionTabs,
        path,
        paths: organizationViewPaths.organization,
        rolesEnabled,
        view
      }),
    [
      extensionTabs,
      view,
      path,
      organizationViewPaths.organization,
      rolesEnabled
    ]
  )

  if (!currentView) {
    const validPaths = Object.entries(organizationViewPaths.organization)
      .filter(([name]) => rolesEnabled || name !== 'roles')
      .map(([, segment]) => segment)
      .join(', ')
    throw new Error(
      `[Vezham Auth] Unknown organization path "${path}". Valid paths are: ${validPaths}`
    )
  }

  if (!isPending && !activeOrganization) {
    return null
  }

  const selectedView = getOrganizationSelectedView(
    currentView,
    canReadRoles.isPending || canReadRoles.data?.success === true
  )

  return (
    <Tabs
      className={cn(className)}
      orientation="horizontal"
      selectedKey={selectedView}
      {...props}>
      <OrganizationNavigation
        basePath={basePaths.organization}
        canReadRoles={canReadRoles}
        extensionTabs={extensionTabs}
        hideNav={Boolean(hideNav)}
        labels={{
          people: organizationLocalization.people,
          roles: organizationLocalization.roles,
          settings: localization.settings.settings,
          teams: organizationLocalization.teams
        }}
        paths={organizationViewPaths.organization}
        rolesEnabled={rolesEnabled}
        slug={slug}
        slugPrefix={slugPrefix}
        teams={Boolean(teams)}
      />

      <Tabs.Panel id="settings" className="px-0">
        {activeOrganization && (
          <OrganizationSettings
            organizationId={activeOrganization.id}
            organizationSlug={activeOrganization.slug}
            variant={variant}
          />
        )}
      </Tabs.Panel>

      <Tabs.Panel id="people" className="px-0">
        <OrganizationPeople />
      </Tabs.Panel>
      {teams && (
        <Tabs.Panel id="teams" className="px-0">
          <OrganizationTeams />
        </Tabs.Panel>
      )}
      {rolesEnabled && (
        <Tabs.Panel id="roles" className="px-0">
          {canReadRoles.data?.success ? (
            <OrganizationRoles organizationId={activeOrganization?.id ?? ''} />
          ) : null}
        </Tabs.Panel>
      )}
      {extensionTabs.map(tab => {
        const Extension = tab.component
        return (
          <Tabs.Panel id={tab.id} key={tab.id} className="px-0">
            <Extension
              organizationId={activeOrganization?.id ?? ''}
              organizationSlug={activeOrganization?.slug ?? ''}
            />
          </Tabs.Panel>
        )
      })}
    </Tabs>
  )
}
