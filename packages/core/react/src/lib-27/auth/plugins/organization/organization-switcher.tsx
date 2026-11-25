import { type ReactNode, useState } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useActiveOrganization,
  useListOrganizations,
  useSetActiveOrganization
} from '@vezham/auth-ui-react/plugins/organization'
import type { Organization } from '@vezham/auth/client'
import {
  SortVertical as ChevronsExpandVertical,
  AddCircle as CirclePlus,
  Settings as Gear
} from '@vezham/icons-react'
import {
  Button,
  type ButtonProps,
  Dropdown,
  type DropdownPopoverProps,
  Label,
  Link,
  cn
} from '@vezham/react-v3'
import { buttonVariants } from '@vezham/styles-v3'

import { UserView } from '../../user/user-view'
import { CreateOrganizationDialog } from './create-organization-dialog'
import { OrganizationView } from './organization-view'

/** Props for the {@link OrganizationSwitcher} component. */
export type OrganizationSwitcherProps = {
  className?: string
  placement?: DropdownPopoverProps['placement']
  variant?: ButtonProps['variant']
  trigger?: ReactNode
  hideCreate?: boolean
  hidePersonal?: boolean
  hideSettings?: boolean
  hideSlug?: boolean
  setActive?: (organization: Organization | null) => void
}

const OrganizationSwitcherTrigger = ({
  activeOrganization,
  className,
  hidePersonal,
  hideSlug,
  isDisabled,
  isPending,
  organizationLabel,
  sessionExists,
  size,
  trigger,
  variant,
  buttonProps
}: {
  activeOrganization?: Organization | null
  buttonProps: ButtonProps
  className?: string
  hidePersonal: boolean
  hideSlug: boolean
  isDisabled: boolean
  isPending: boolean
  organizationLabel: string
  sessionExists: boolean
  size: ButtonProps['size']
  trigger?: ReactNode
  variant: ButtonProps['variant']
}) =>
  trigger ? (
    <Dropdown.Trigger>{trigger}</Dropdown.Trigger>
  ) : (
    <Button
      variant={variant}
      className={cn('h-auto px-2 py-2 text-left', className)}
      isDisabled={isDisabled}
      aria-label={organizationLabel}
      {...buttonProps}>
      {isPending ? (
        <OrganizationView size={size} isPending hideRole hideSlug={hideSlug} />
      ) : activeOrganization ? (
        <OrganizationView size={size} hideRole hideSlug={hideSlug} />
      ) : sessionExists && !hidePersonal ? (
        <UserView size={size} hideSubtitle={hideSlug} />
      ) : (
        <OrganizationView
          size={size}
          hideRole
          hideSlug={hideSlug}
          organization={{ name: organizationLabel }}
        />
      )}
      <ChevronsExpandVertical
        size={16}
        className="text-muted size-3 shrink-0"
      />
    </Button>
  )

const OrganizationSwitcherSummary = ({
  activeOrganization,
  accountHref,
  hidePersonal,
  hideSettings,
  hideSlug,
  isPending,
  onClose,
  organizationSettingsHref,
  sessionExists,
  labels
}: {
  activeOrganization?: Organization | null
  accountHref: string
  hidePersonal: boolean
  hideSettings: boolean
  hideSlug: boolean
  isPending: boolean
  onClose: () => void
  organizationSettingsHref: string
  sessionExists: boolean
  labels: { manage: string; settings: string }
}) => {
  if (activeOrganization) {
    return (
      <div className="flex items-center justify-between gap-4 px-4 pt-3">
        <OrganizationView
          hideRole
          hideSlug={hideSlug}
          organization={activeOrganization}
        />
        {!hideSettings ? (
          <Link
            href={organizationSettingsHref}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'shrink-0 gap-2'
            )}
            onPress={onClose}>
            <Gear size={16} className="text-muted" />
            {labels.manage}
          </Link>
        ) : null}
      </div>
    )
  }

  if (!isPending && sessionExists && !hidePersonal) {
    return (
      <div className="flex items-center justify-between gap-4 px-4 pt-3">
        <UserView hideSubtitle={hideSlug} />
        {!hideSettings ? (
          <Link
            href={accountHref}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'shrink-0 gap-2'
            )}
            onPress={onClose}>
            <Gear size={16} className="text-muted" />
            {labels.settings}
          </Link>
        ) : null}
      </div>
    )
  }

  return null
}

const OrganizationSwitcherMenu = ({
  activeOrganizationId,
  hideCreate,
  hidePersonal,
  hideSlug,
  onCreate,
  onSelect,
  organizations,
  labels
}: {
  activeOrganizationId?: string
  hideCreate: boolean
  hidePersonal: boolean
  hideSlug: boolean
  onCreate: () => void
  onSelect: (organization: Organization | null) => void
  organizations?: Organization[]
  labels: { create: string; personal: string }
}) => (
  <Dropdown.Menu>
    {activeOrganizationId && !hidePersonal ? (
      <Dropdown.Item textValue={labels.personal} onPress={() => onSelect(null)}>
        <UserView hideSubtitle={hideSlug} />
      </Dropdown.Item>
    ) : null}
    {organizations
      ?.filter(organization => organization.id !== activeOrganizationId)
      .map(organization => (
        <Dropdown.Item
          key={organization.id}
          textValue={organization.name}
          onPress={() => onSelect(organization)}>
          <OrganizationView
            hideRole
            hideSlug={hideSlug}
            organization={organization}
          />
        </Dropdown.Item>
      ))}
    {!hideCreate ? (
      <Dropdown.Item textValue={labels.create} onPress={onCreate}>
        <CirclePlus size={16} className="text-muted" />
        <Label>{labels.create}</Label>
      </Dropdown.Item>
    ) : null}
  </Dropdown.Menu>
)

/**
 * Renders an organizations dropdown with a trigger button,
 * header summary, and a menu of organizations to switch to.
 */
export const OrganizationSwitcher = ({
  className,
  hideCreate,
  hidePersonal,
  hideSettings,
  hideSlug: hideSlugProp,
  setActive,
  placement,
  variant = 'ghost',
  size = 'md',
  trigger,
  ...props
}: OrganizationSwitcherProps & ButtonProps) => {
  const { authClient, navigate, basePaths, localization, viewPaths } =
    useAuth<OrganizationAuthClient>()
  const { data: session, isPending: sessionPending } = useSession(authClient)
  const {
    localization: organizationLocalization,
    viewPaths: organizationViewPaths,
    slug,
    slugPrefix,
    hideSlug: pluginHideSlug
  } = useAuthPlugin(organizationPlugin)
  const hideSlug = hideSlugProp ?? pluginHideSlug ?? true

  const { data: activeOrganization, isPending: activeOrganizationPending } =
    useActiveOrganization(authClient)

  const { data: organizations, isPending: organizationsPending } =
    useListOrganizations(authClient)

  const { mutate: setActiveOrganization } = useSetActiveOrganization(authClient)

  const isPending =
    sessionPending ||
    (!!session && (organizationsPending || activeOrganizationPending))

  const [createOpen, setCreateOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleSetActive = (organization: Organization | null) => {
    if (setActive) {
      setActive(organization)
    } else if (slug !== undefined) {
      navigate({
        to: organization
          ? `${basePaths.organization}/${slugPrefix}${organization.slug}/${organizationViewPaths.organization.settings}`
          : `${basePaths.settings}/${viewPaths.settings.account}`
      })
    } else {
      setActiveOrganization({ organizationId: organization?.id ?? null })
    }
  }

  return (
    <>
      <Dropdown isOpen={dropdownOpen} onOpenChange={setDropdownOpen}>
        <OrganizationSwitcherTrigger
          activeOrganization={activeOrganization}
          buttonProps={props}
          className={className}
          hidePersonal={Boolean(hidePersonal)}
          hideSlug={hideSlug}
          isDisabled={!session || isPending}
          isPending={isPending}
          organizationLabel={organizationLocalization.organization}
          sessionExists={Boolean(session)}
          size={size}
          trigger={trigger}
          variant={variant}
        />
        <Dropdown.Popover placement={placement} className="max-w-svw">
          <OrganizationSwitcherSummary
            activeOrganization={activeOrganization}
            accountHref={`${basePaths.settings}/${viewPaths.settings.account}`}
            hidePersonal={Boolean(hidePersonal)}
            hideSettings={Boolean(hideSettings)}
            hideSlug={hideSlug}
            isPending={isPending}
            onClose={() => setDropdownOpen(false)}
            organizationSettingsHref={
              slug
                ? `${basePaths.organization}/${slugPrefix}${slug}/${organizationViewPaths.organization.settings}`
                : `${basePaths.organization}/${organizationViewPaths.organization.settings}`
            }
            sessionExists={Boolean(session?.user)}
            labels={{
              manage: organizationLocalization.manage,
              settings: localization.settings.settings
            }}
          />
          <OrganizationSwitcherMenu
            activeOrganizationId={activeOrganization?.id}
            hideCreate={Boolean(hideCreate)}
            hidePersonal={Boolean(hidePersonal)}
            hideSlug={hideSlug}
            onCreate={() => setCreateOpen(true)}
            onSelect={handleSetActive}
            organizations={organizations ?? undefined}
            labels={{
              create: organizationLocalization.createOrganization,
              personal: organizationLocalization.personalAccount
            }}
          />
        </Dropdown.Popover>
      </Dropdown>

      <CreateOrganizationDialog
        hideSlug={hideSlug}
        isOpen={createOpen}
        onOpenChange={setCreateOpen}
      />
    </>
  )
}
