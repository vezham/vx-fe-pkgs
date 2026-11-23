import type { ComponentProps } from 'react'

import { cn } from '@vezham/react-v3'

import { OrganizationInvitations } from './organization-invitations'
import { OrganizationMembers } from './organization-members'

/** Props for the {@link OrganizationPeople} component. */
export type OrganizationPeopleProps = {
  className?: string
}

/**
 * Organization people UI: members table (see {@link OrganizationMembers}), then org
 * invitations.
 */
export const OrganizationPeople = ({
  className,
  ...props
}: OrganizationPeopleProps & ComponentProps<'div'>) => {
  return (
    <div className={cn('flex flex-col gap-4 md:gap-6', className)} {...props}>
      <OrganizationMembers />
      <OrganizationInvitations />
    </div>
  )
}
