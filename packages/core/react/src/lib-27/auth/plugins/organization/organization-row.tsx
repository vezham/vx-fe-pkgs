import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useSetActiveOrganization } from '@vezham/auth-ui-react/plugins/organization'
import type { Organization } from '@vezham/auth/client'
import { Settings as Gear } from '@vezham/icons-react'
import { Button, Spinner } from '@vezham/react-v3'

import { OrganizationView } from './organization-view'

export type OrganizationRowProps = {
  organization: Organization
}

/**
 * Single organization row: logo and labels via {@link OrganizationView}, plus Manage.
 */
export const OrganizationRow = ({ organization }: OrganizationRowProps) => {
  const { authClient, basePaths, navigate } = useAuth<OrganizationAuthClient>()
  const {
    localization: organizationLocalization,
    viewPaths: organizationViewPaths,
    slug,
    slugPrefix
  } = useAuthPlugin(organizationPlugin)

  const { mutate: setActiveOrganization, isPending: setActivePending } =
    useSetActiveOrganization(authClient, {
      onSuccess: () => {
        navigate({
          to: `${basePaths.organization}/${organizationViewPaths.organization.settings}`
        })
      }
    })

  const manageOrganization = () => {
    if (slug !== undefined) {
      navigate({
        to: `${basePaths.organization}/${slugPrefix}${organization.slug}/${organizationViewPaths.organization.settings}`
      })
    } else {
      setActiveOrganization({ organizationId: organization.id })
    }
  }

  return (
    <div className="flex items-center gap-3">
      <OrganizationView organization={organization} />

      <Button
        className="ml-auto shrink-0"
        variant="outline"
        size="sm"
        isPending={setActivePending}
        onPress={manageOrganization}
        aria-label={organizationLocalization.manage}>
        {setActivePending ? (
          <Spinner color="current" size="sm" />
        ) : (
          <Gear size={16} />
        )}

        {organizationLocalization.manage}
      </Button>
    </div>
  )
}
