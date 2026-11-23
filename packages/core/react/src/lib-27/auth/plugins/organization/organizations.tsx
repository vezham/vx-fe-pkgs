import { useState } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useListOrganizations } from '@vezham/auth-ui-react/plugins/organization'
import { Button, Card, type CardProps } from '@vezham/react-v3'

import { CreateOrganizationDialog } from './create-organization-dialog'
import { OrganizationRow } from './organization-row'
import { OrganizationViewSkeleton } from './organization-view-skeleton'
import { OrganizationsEmpty } from './organizations-empty'

export type OrganizationsProps = {
  variant?: CardProps['variant']
}

/**
 * Lists organizations the user belongs to (via {@link useListOrganizations}): loading skeleton,
 * empty state with create, or a card of rows with a Manage control per organization.
 * Owns {@link CreateOrganizationDialog} open state and the create actions.
 */
export const Organizations = ({ variant }: OrganizationsProps) => {
  const { authClient } = useAuth<OrganizationAuthClient>()
  const {
    allowOrganizationCreation,
    localization: organizationLocalization,
    organizationLimit
  } = useAuthPlugin(organizationPlugin)

  const [createOpen, setCreateOpen] = useState(false)

  const { data: organizations, isPending: organizationsPending } =
    useListOrganizations(authClient)
  const canCreate =
    allowOrganizationCreation &&
    (organizationLimit === undefined ||
      (organizations?.length ?? 0) < organizationLimit)

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="truncate text-sm font-semibold">
            {organizationLocalization.organizations}
          </h2>

          {allowOrganizationCreation && (
            <Button
              className="shrink-0"
              size="sm"
              isDisabled={organizationsPending || !canCreate}
              onPress={() => setCreateOpen(true)}>
              {organizationLocalization.createOrganization}
            </Button>
          )}
        </div>

        <Card variant={variant}>
          <Card.Content className="gap-0">
            {organizationsPending ? (
              <OrganizationViewSkeleton />
            ) : !organizations?.length ? (
              <OrganizationsEmpty
                canCreate={canCreate}
                onCreatePress={() => setCreateOpen(true)}
              />
            ) : (
              organizations.map((organization, index) => (
                <div key={organization.id}>
                  {index > 0 && (
                    <div className="-mx-4 my-4 border-b border-dashed" />
                  )}

                  <OrganizationRow organization={organization} />
                </div>
              ))
            )}
          </Card.Content>
        </Card>
      </div>

      {canCreate && (
        <CreateOrganizationDialog
          isOpen={createOpen}
          onOpenChange={setCreateOpen}
        />
      )}
    </>
  )
}
