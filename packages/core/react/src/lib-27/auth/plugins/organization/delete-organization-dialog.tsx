import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useDeleteOrganization } from '@vezham/auth-ui-react/plugins/organization'
import type { Organization } from '@vezham/auth/client'
import { DangerTriangle as TriangleExclamation } from '@vezham/icons-react'
import { AlertDialog, Button, Card, toast } from '@vezham/react-v3'

import { useAuthForm } from '../../auth-form'
import { OrganizationView } from './organization-view'

export type DeleteOrganizationDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  organization: Organization
}

export const DeleteOrganizationDialog = ({
  isOpen,
  onOpenChange,
  organization
}: DeleteOrganizationDialogProps) => {
  const { authClient, basePaths, localization, navigate } =
    useAuth<OrganizationAuthClient>()
  const {
    localization: organizationLocalization,
    viewPaths: organizationPluginViewPaths
  } = useAuthPlugin(organizationPlugin)

  const { mutateAsync: deleteOrganization, isPending } = useDeleteOrganization(
    authClient,
    {
      onSuccess: () => {
        onOpenChange(false)
        toast.success(organizationLocalization.organizationDeleted)

        navigate({
          to: `${basePaths.settings}/${organizationPluginViewPaths.settings.organizations}`,
          replace: true
        })
      }
    }
  )

  const form = useAuthForm({
    defaultValues: {},
    onSubmit: async () =>
      deleteOrganization({ organizationId: organization.id })
  })

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <form.AppForm>
            <form.AuthFormRoot>
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="danger">
                  <TriangleExclamation size={16} />
                </AlertDialog.Icon>

                <AlertDialog.Heading>
                  {organizationLocalization.deleteOrganization}
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body className="flex flex-col gap-4 overflow-visible">
                <p className="text-muted text-sm">
                  {organizationLocalization.deleteOrganizationDescription}
                </p>

                <Card variant="secondary">
                  <Card.Content>
                    <OrganizationView organization={organization} hideRole />
                  </Card.Content>
                </Card>
                <form.AuthFormServerError />
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" isDisabled={isPending}>
                  {localization.settings.cancel}
                </Button>

                <form.AuthFormSubmitButton
                  isPending={isPending}
                  variant="danger"
                  isDisabled={isPending}>
                  {organizationLocalization.deleteOrganization}
                </form.AuthFormSubmitButton>
              </AlertDialog.Footer>
            </form.AuthFormRoot>
          </form.AppForm>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
