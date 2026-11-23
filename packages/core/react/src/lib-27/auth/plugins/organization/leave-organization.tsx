import { useState } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useActiveOrganization } from '@vezham/auth-ui-react/plugins/organization'
import { AlertDialog, Button } from '@vezham/react-v3'

import { LeaveOrganizationDialog } from './leave-organization-dialog'

/**
 * Danger-zone row to leave the active organization.
 */
export const LeaveOrganization = () => {
  const { authClient } = useAuth<OrganizationAuthClient>()
  const { localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)

  const { data: activeOrganization } = useActiveOrganization(authClient)

  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm leading-tight font-medium">
          {organizationLocalization.leaveOrganization}
        </p>

        <p className="text-muted mt-0.5 text-xs">
          {organizationLocalization.leaveOrganizationDescription}
        </p>
      </div>

      <AlertDialog>
        <Button
          isDisabled={!activeOrganization}
          size="sm"
          variant="danger-soft"
          onPress={() => setConfirmOpen(true)}>
          {organizationLocalization.leaveOrganization}
        </Button>

        {activeOrganization && (
          <LeaveOrganizationDialog
            isOpen={confirmOpen}
            onOpenChange={setConfirmOpen}
            organization={activeOrganization}
          />
        )}
      </AlertDialog>
    </div>
  )
}
