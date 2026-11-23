import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuthPlugin } from '@vezham/auth-ui-react'
import { Case as Briefcase } from '@vezham/icons-react'
import { Button, EmptyState } from '@vezham/react-v3'

export type OrganizationsEmptyProps = {
  onCreatePress: () => void
  canCreate?: boolean
}

export const OrganizationsEmpty = ({
  onCreatePress,
  canCreate = true
}: OrganizationsEmptyProps) => {
  const { localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)

  return (
    <EmptyState className="flex flex-col items-center gap-4 text-center">
      <div className="bg-surface-secondary flex size-12 items-center justify-center rounded-full">
        <Briefcase size={16} className="size-5" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-foreground text-sm font-semibold">
          {organizationLocalization.noOrganizations}
        </p>

        <span className="text-muted text-sm">
          {organizationLocalization.organizationsDescription}
        </span>
      </div>

      <Button size="sm" isDisabled={!canCreate} onPress={onCreatePress}>
        {organizationLocalization.createOrganization}
      </Button>
    </EmptyState>
  )
}
