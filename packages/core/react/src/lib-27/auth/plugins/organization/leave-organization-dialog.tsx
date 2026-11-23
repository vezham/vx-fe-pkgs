import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useLeaveOrganization } from '@vezham/auth-ui-react/plugins/organization'
import type { Organization } from '@vezham/auth/client'
import { Logout as ArrowRightFromSquare } from '@vezham/icons-react'
import { AlertDialog, Button, Card, Spinner, toast } from '@vezham/react-v3'

import { OrganizationView } from './organization-view'

export type LeaveOrganizationDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  organization: Organization
}

export const LeaveOrganizationDialog = ({
  isOpen,
  onOpenChange,
  organization
}: LeaveOrganizationDialogProps) => {
  const { authClient, basePaths, localization, navigate } =
    useAuth<OrganizationAuthClient>()
  const {
    localization: organizationLocalization,
    viewPaths: organizationPluginViewPaths
  } = useAuthPlugin(organizationPlugin)

  const { mutate: leaveOrganization, isPending } = useLeaveOrganization(
    authClient,
    {
      onSuccess: () => {
        onOpenChange(false)
        toast.success(organizationLocalization.leftOrganization)

        navigate({
          to: `${basePaths.settings}/${organizationPluginViewPaths.settings.organizations}`,
          replace: true
        })
      }
    }
  )

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.CloseTrigger />

          <AlertDialog.Header>
            <AlertDialog.Icon status="danger">
              <ArrowRightFromSquare size={16} />
            </AlertDialog.Icon>

            <AlertDialog.Heading>
              {organizationLocalization.leaveOrganization}
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body className="flex flex-col gap-4 overflow-visible">
            <p className="text-muted text-sm">
              {organizationLocalization.leaveOrganizationDescription}
            </p>

            <Card variant="secondary">
              <Card.Content>
                <OrganizationView organization={organization} hideRole />
              </Card.Content>
            </Card>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary" isDisabled={isPending}>
              {localization.settings.cancel}
            </Button>

            <Button
              variant="danger"
              isPending={isPending}
              onPress={() =>
                leaveOrganization({ organizationId: organization.id })
              }>
              {isPending && <Spinner color="current" size="sm" />}

              {organizationLocalization.leaveOrganization}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
