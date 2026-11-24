import type { ReactNode } from 'react'

import type { User } from '@vezham/auth'
import type { UsernameAuthClient } from '@vezham/auth-ui-core/plugins/username'
import { useAuth, useSession } from '@vezham/auth-ui-react'
import { User as Person } from '@vezham/icons-react'
import { Avatar, type AvatarProps, Skeleton, cn } from '@vezham/react-v3'

export type UserAvatarProps = {
  className?: string
  fallback?: ReactNode
  isPending?: boolean
  /** @remarks `User` */
  user?: Partial<User> & {
    username?: string | null
    displayUsername?: string | null
  }
  size?: AvatarProps['size']
}

const avatarSizeClasses = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12'
} as const

const avatarTextClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl'
} as const

const AvatarSkeleton = ({
  className,
  size,
  style
}: Pick<UserAvatarProps & AvatarProps, 'className' | 'size' | 'style'>) => (
  <Skeleton
    className={cn('rounded-full', avatarSizeClasses[size ?? 'sm'], className)}
    style={style}
  />
)

const AvatarFallbackContent = ({
  fallback,
  initials
}: {
  fallback?: ReactNode
  initials?: string
}) => fallback || initials || <Person size={16} className="size-4" />

/**
 * Render a user avatar that shows the user's image, initials, or a custom fallback; displays a circular skeleton while the session (or explicit pending flag) is pending.
 *
 * @param className - Additional CSS classes applied to the outer avatar container
 * @param fallback - Custom fallback content to render when no image or initials are available
 * @param isPending - When true, force rendering of the loading skeleton (unless an explicit `user` prop is provided)
 * @param user - Optional user object to display; when omitted the current session user is used if available
 * @param size - Visual size of the avatar; one of `"sm"`, `"md"`, or `"lg"` (default: `"sm"`)
 * @returns A React element that displays the user's avatar image, initials, or the provided fallback; renders a circular skeleton while loading
 */
export const UserAvatar = ({
  className,
  fallback,
  isPending,
  user,
  size = 'sm',
  style,
  ...props
}: UserAvatarProps & AvatarProps) => {
  const { authClient } = useAuth<UsernameAuthClient>()
  const { data: session, isPending: sessionPending } = useSession(authClient, {
    enabled: !user && !isPending
  })

  if ((isPending || sessionPending) && !user) {
    return <AvatarSkeleton className={className} size={size} style={style} />
  }

  const resolvedUser = user ?? session?.user

  const initials = (
    resolvedUser?.username ||
    resolvedUser?.name ||
    resolvedUser?.email
  )
    ?.slice(0, 2)
    .toUpperCase()

  return (
    <Avatar
      size={size}
      className={cn('rounded-full', className)}
      style={style}
      {...props}>
      <Avatar.Image
        alt={
          resolvedUser?.displayUsername ||
          resolvedUser?.name ||
          resolvedUser?.email
        }
        src={resolvedUser?.image ?? undefined}
      />

      <Avatar.Fallback
        className={cn(avatarTextClasses[size ?? 'sm'])}
        delayMs={resolvedUser?.image ? 600 : undefined}>
        <AvatarFallbackContent fallback={fallback} initials={initials} />
      </Avatar.Fallback>
    </Avatar>
  )
}
