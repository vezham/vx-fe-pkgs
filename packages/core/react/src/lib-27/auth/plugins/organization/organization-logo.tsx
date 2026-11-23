import type { ReactNode } from 'react'

import type { Organization } from '@vezham/auth/client'
import { Case as Briefcase } from '@vezham/icons-react'
import { Avatar, type AvatarProps, Skeleton, cn } from '@vezham/react-v3'

export type OrganizationLogoProps = {
  className?: string
  fallback?: ReactNode
  isPending?: boolean
  organization?: Partial<Organization> | null
  size?: AvatarProps['size']
}

/**
 * Renders an organization logo image, initials fallback, or a briefcase icon;
 * shows a circular skeleton while loading when `isPending` is set and `organization` is undefined.
 */
export const OrganizationLogo = ({
  className,
  fallback,
  isPending,
  organization,
  size = 'sm',
  style,
  ...props
}: OrganizationLogoProps & AvatarProps) => {
  if (isPending && !organization) {
    return (
      <Skeleton
        className={cn(
          'rounded-full',
          size === 'sm' ? 'size-8' : size === 'md' ? 'size-10' : 'size-12',
          className
        )}
        style={style}
      />
    )
  }

  const initials = organization?.name?.slice(0, 2).toUpperCase()

  return (
    <Avatar
      size={size}
      className={cn('rounded-full', className)}
      style={style}
      {...props}>
      <Avatar.Image
        alt={organization?.name ?? 'Organization'}
        src={organization?.logo ?? undefined}
      />

      <Avatar.Fallback
        className={cn(
          size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'
        )}
        delayMs={organization?.logo ? 600 : undefined}>
        {fallback || initials || <Briefcase size={16} className="size-4" />}
      </Avatar.Fallback>
    </Avatar>
  )
}
