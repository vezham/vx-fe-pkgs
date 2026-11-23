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
        {trigger ? (
          <Dropdown.Trigger>{trigger}</Dropdown.Trigger>
        ) : (
          <Button
            variant={variant}
            className={cn('h-auto px-2 py-2 text-left', className)}
            isDisabled={!session || isPending}
            aria-label={organizationLocalization.organization}
            {...props}>
            {isPending ? (
              <OrganizationView
                size={size}
                isPending
                hideRole
                hideSlug={hideSlug}
              />
            ) : activeOrganization ? (
              <OrganizationView size={size} hideRole hideSlug={hideSlug} />
            ) : session && !hidePersonal ? (
              <UserView size={size} hideSubtitle={hideSlug} />
            ) : (
              <OrganizationView
                size={size}
                hideRole
                hideSlug={hideSlug}
                organization={{
                  name: organizationLocalization.organization
                }}
              />
            )}

            <ChevronsExpandVertical
              size={16}
              className="text-muted size-3 shrink-0"
            />
          </Button>
        )}

        <Dropdown.Popover placement={placement} className="max-w-svw">
          {activeOrganization ? (
            <div className="flex items-center justify-between gap-4 px-4 pt-3">
              <OrganizationView
                hideRole
                hideSlug={hideSlug}
                organization={activeOrganization}
              />

              {!hideSettings && (
                <Link
                  href={
                    slug
                      ? `${basePaths.organization}/${slugPrefix}${slug}/${organizationViewPaths.organization.settings}`
                      : `${basePaths.organization}/${organizationViewPaths.organization.settings}`
                  }
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'shrink-0 gap-2'
                  )}
                  onPress={() => setDropdownOpen(false)}>
                  <Gear size={16} className="text-muted" />

                  {organizationLocalization.manage}
                </Link>
              )}
            </div>
          ) : !isPending && session?.user && !hidePersonal ? (
            <div className="flex items-center justify-between gap-4 px-4 pt-3">
              <UserView hideSubtitle={hideSlug} />

              {!hideSettings && (
                <Link
                  href={`${basePaths.settings}/${viewPaths.settings.account}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'shrink-0 gap-2'
                  )}
                  onPress={() => setDropdownOpen(false)}>
                  <Gear size={16} className="text-muted" />

                  {localization.settings.settings}
                </Link>
              )}
            </div>
          ) : null}

          <Dropdown.Menu>
            {!!activeOrganization && !hidePersonal && (
              <Dropdown.Item
                textValue={organizationLocalization.personalAccount}
                onPress={() => handleSetActive(null)}>
                <UserView hideSubtitle={hideSlug} />
              </Dropdown.Item>
            )}

            {organizations
              ?.filter(
                organization => organization.id !== activeOrganization?.id
              )
              ?.map(organization => (
                <Dropdown.Item
                  key={organization.id}
                  textValue={organization.name}
                  onPress={() => handleSetActive(organization)}>
                  <OrganizationView
                    hideRole
                    hideSlug={hideSlug}
                    organization={organization}
                  />
                </Dropdown.Item>
              ))}

            {!hideCreate && (
              <Dropdown.Item
                textValue={organizationLocalization.createOrganization}
                onPress={() => setCreateOpen(true)}>
                <CirclePlus size={16} className="text-muted" />

                <Label>{organizationLocalization.createOrganization}</Label>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
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
