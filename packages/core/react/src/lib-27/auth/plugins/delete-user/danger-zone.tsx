import type { ComponentProps } from 'react'

import { useAuth } from '@vezham/auth-ui-react'
import { type CardProps, cn } from '@vezham/react-v3'

import { DeleteAccount } from './delete-account'

export type DangerZoneProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Renders the danger zone heading and {@link DeleteAccount}.
 * Registered as a `securityCard` by `deleteUserPlugin()`; gate by registering the plugin.
 */
export const DangerZone = ({
  className,
  variant,
  ...props
}: DangerZoneProps & ComponentProps<'div'>) => {
  const { localization } = useAuth()

  return (
    <div className={cn('flex w-full flex-col', className)} {...props}>
      <h2 className={cn('text-danger mb-3 text-sm font-semibold')}>
        {localization.settings.dangerZone}
      </h2>

      <DeleteAccount variant={variant} />
    </div>
  )
}
