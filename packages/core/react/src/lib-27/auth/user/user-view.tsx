import type { ComponentProps } from 'react'

import type { User } from '@vezham/auth'
import type { UsernameAuthClient } from '@vezham/auth-ui-core/plugins/username'
import { useAuth, useSession } from '@vezham/auth-ui-react'
import { type AvatarProps, Skeleton, cn } from '@vezham/react-v3'

import { UserAvatar } from './user-avatar'

export type UserViewProps = {
  className?: string
  isPending?: boolean
  size?: AvatarProps['size']
  /**
   * When true, the subtitle line (email when name/username is shown) is hidden.
   * @default false
   */
  hideSubtitle?: boolean
  /** @remarks `User` */
  user?: Partial<User> & {
    username?: string | null
    displayUsername?: string | null
  }
}

/**
 * Render a compact user item with an avatar, a primary label (display username, name, or email), and an optional subtitle (email).
 *
 * @param isPending - If true and no `user` prop is provided, renders a loading skeleton instead of user details
 * @param size - Avatar size variant; defaults to `"md"`
 * @param hideSubtitle - When true, omits the muted subtitle row under the primary label
 * @param user - Optional user to display; when omitted the current session user is used if available
 * @returns A React element containing the user's avatar and text labels
 */
export const UserView = ({
  className,
  isPending,
  size = 'md',
  hideSubtitle = false,
  user,
  ...props
}: UserViewProps & ComponentProps<'div'>) => {
  const { authClient } = useAuth<UsernameAuthClient>()
  const { data: session, isPending: sessionPending } = useSession(authClient, {
    enabled: !user && !isPending
  })

  const resolvedUser = user ?? session?.user

  if ((isPending || sessionPending) && !user) {
    return (
      <div
        className={cn('flex min-w-0 items-center gap-2', className)}
        {...props}>
        <UserAvatar
          isPending
          className={size === 'sm' ? 'size-5 [&>span]:text-xs' : undefined}
          size={size === 'lg' ? 'md' : 'sm'}
        />

        <div className="flex min-w-0 flex-col gap-1">
          <Skeleton className="h-3.5 w-24 rounded-lg" />

          {!hideSubtitle ? <Skeleton className="h-3 w-32 rounded-lg" /> : null}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('flex min-w-0 items-center gap-2', className)}
      {...props}>
      <UserAvatar
        className={size === 'sm' ? 'size-5 [&>span]:text-xs' : undefined}
        user={resolvedUser}
        size={size === 'lg' ? 'md' : 'sm'}
      />

      <div className="flex min-w-0 flex-col">
        <p className="text-foreground truncate text-sm leading-tight font-medium">
          {resolvedUser?.displayUsername ||
            resolvedUser?.name ||
            resolvedUser?.email}
        </p>

        {!hideSubtitle &&
        (resolvedUser?.displayUsername || resolvedUser?.name) ? (
          <p className="text-muted truncate overflow-x-hidden text-xs leading-tight">
            {resolvedUser?.email}
          </p>
        ) : null}
      </div>
    </div>
  )
}
