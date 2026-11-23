import type { ComponentProps } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useActiveOrganization,
  useListOrganizationMembers
} from '@vezham/auth-ui-react/plugins/organization'
import type { Organization } from '@vezham/auth/client'
import { type AvatarProps, Chip, cn } from '@vezham/react-v3'

import { OrganizationLogo } from './organization-logo'
import { OrganizationViewSkeleton } from './organization-view-skeleton'

export type OrganizationViewProps = {
  className?: string
  isPending?: boolean
  size?: AvatarProps['size']
  hideRole?: boolean
  hideSlug?: boolean
  organization?: Partial<Organization>
}

/**
 * Compact organization row: logo, primary name, secondary slug — analogous to {@link UserView}.
 */
export const OrganizationView = ({
  className,
  isPending,
  size = 'md',
  hideSlug: hideSlugProp,
  hideRole,
  organization,
  ...props
}: OrganizationViewProps & ComponentProps<'div'>) => {
  const { authClient } = useAuth<OrganizationAuthClient>()
  const {
    roles,
    slugPrefix,
    hideSlug: pluginHideSlug
  } = useAuthPlugin(organizationPlugin)
  const hideSlug = hideSlugProp ?? pluginHideSlug ?? false

  const { data: session } = useSession(authClient)

  const { data: activeOrganization, isPending: activeOrganizationPending } =
    useActiveOrganization(authClient, {
      enabled: !organization && !isPending
    })

  const resolvedOrganization = organization ?? activeOrganization

  const { data: membersList, isPending: membersPending } =
    useListOrganizationMembers(authClient, {
      query: {
        organizationId: resolvedOrganization?.id
      },
      enabled: !!resolvedOrganization?.id && !hideRole
    })

  const membership = membersList?.members?.find(
    member => member.userId === session?.user.id
  )

  if (
    isPending ||
    (!organization && activeOrganizationPending) ||
    (!hideRole && !!resolvedOrganization?.id && membersPending)
  ) {
    return (
      <OrganizationViewSkeleton
        className={className}
        hideSlug={hideSlug}
        size={size}
        {...props}
      />
    )
  }

  return (
    <div
      className={cn('flex min-w-0 items-center gap-2', className)}
      {...props}>
      <OrganizationLogo
        organization={resolvedOrganization}
        className={size === 'sm' ? 'size-5 [&>span]:text-xs' : undefined}
        size={size === 'lg' ? 'md' : 'sm'}
      />

      <div className="flex min-w-0 flex-col">
        <div className="flex min-w-0 items-center gap-2">
          <p className="text-foreground truncate text-sm leading-tight font-medium">
            {resolvedOrganization?.name}
          </p>

          {!hideRole && !!membership && (
            <Chip className="-my-0.5 shrink-0" size="sm">
              {roles?.[membership.role] ?? membership.role}
            </Chip>
          )}
        </div>

        {!hideSlug && !!resolvedOrganization?.slug && (
          <p className="text-muted truncate overflow-x-hidden font-mono text-xs leading-tight">
            {slugPrefix}
            {resolvedOrganization.slug}
          </p>
        )}
      </div>
    </div>
  )
}
