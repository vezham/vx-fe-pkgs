import type { ComponentProps } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth } from '@vezham/auth-ui-react'
import { useHasPermission } from '@vezham/auth-ui-react/plugins/organization'
import { Card, type CardProps, cn } from '@vezham/react-v3'

import { DeleteOrganization } from './delete-organization'
import { DeleteOrganizationSkeleton } from './delete-organization-skeleton'
import { LeaveOrganization } from './leave-organization'

export type OrganizationDangerZoneProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Danger zone heading with {@link LeaveOrganization} and {@link DeleteOrganization}
 * for the active organization in a single card.
 *
 * Resolves the `organization:delete` permission before rendering anything to
 * avoid flashing {@link LeaveOrganization} (and a stray separator) before the
 * delete row appears or disappears. Inner {@link DeleteOrganization} also
 * self-gates so it stays safe to use standalone.
 */
export const OrganizationDangerZone = ({
  className,
  variant,
  ...props
}: OrganizationDangerZoneProps & ComponentProps<'div'>) => {
  const { authClient, localization } = useAuth<OrganizationAuthClient>()

  const { data: deletePermission, isPending: deletePermissionPending } =
    useHasPermission(authClient, {
      permissions: { organization: ['delete'] }
    })

  const canDelete = !!deletePermission?.success

  return (
    <div className={cn('flex w-full flex-col', className)} {...props}>
      <h2 className={cn('text-danger mb-3 text-sm font-semibold')}>
        {localization.settings.dangerZone}
      </h2>

      <Card variant={variant}>
        <Card.Content className="gap-0">
          {deletePermissionPending ? (
            <DeleteOrganizationSkeleton />
          ) : (
            <>
              <LeaveOrganization />

              {canDelete && (
                <>
                  <div className="-mx-4 my-4 border-b border-dashed" />

                  <DeleteOrganization />
                </>
              )}
            </>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
