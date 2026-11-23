import { useState } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useActiveOrganization,
  useHasPermission
} from '@vezham/auth-ui-react/plugins/organization'
import { AlertDialog, Button } from '@vezham/react-v3'

import { DeleteOrganizationDialog } from './delete-organization-dialog'
import { DeleteOrganizationSkeleton } from './delete-organization-skeleton'

/**
 * Danger-zone row to delete the active organization. Hidden for members without
 * the `organization:delete` permission.
 */
export const DeleteOrganization = () => {
  const { authClient } = useAuth<OrganizationAuthClient>()
  const { localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)

  const { data: activeOrganization } = useActiveOrganization(authClient)

  const { data: permission, isPending: permissionPending } = useHasPermission(
    authClient,
    {
      permissions: { organization: ['delete'] }
    }
  )

  const [confirmOpen, setConfirmOpen] = useState(false)

  if (permissionPending) {
    return <DeleteOrganizationSkeleton />
  }

  if (!permission?.success) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm leading-tight font-medium">
          {organizationLocalization.deleteOrganization}
        </p>

        <p className="text-muted mt-0.5 text-xs">
          {organizationLocalization.deleteOrganizationDescription}
        </p>
      </div>

      <AlertDialog>
        <Button
          isDisabled={!activeOrganization}
          size="sm"
          variant="danger-soft"
          onPress={() => setConfirmOpen(true)}>
          {organizationLocalization.deleteOrganization}
        </Button>

        {activeOrganization && (
          <DeleteOrganizationDialog
            isOpen={confirmOpen}
            onOpenChange={setConfirmOpen}
            organization={activeOrganization}
          />
        )}
      </AlertDialog>
    </div>
  )
}
