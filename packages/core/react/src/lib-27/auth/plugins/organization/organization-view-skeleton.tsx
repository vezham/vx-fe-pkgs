import type { ComponentProps } from 'react'

import { Skeleton, cn } from '@vezham/react-v3'

import { OrganizationLogo } from './organization-logo'
import type { OrganizationViewProps } from './organization-view'

/**
 * Placeholder matching {@link OrganizationView} while organization data loads.
 */
export const OrganizationViewSkeleton = ({
  className,
  hideSlug,
  size = 'md',
  ...props
}: OrganizationViewProps & ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex min-w-0 items-center gap-2', className)}
      {...props}>
      <OrganizationLogo
        isPending
        className={size === 'sm' ? 'size-5' : undefined}
        size={size === 'lg' ? 'md' : 'sm'}
      />

      <div className="flex min-w-0 flex-col gap-1">
        <Skeleton className="h-3.5 w-20 rounded-lg" />

        {!hideSlug && (
          <Skeleton className="mt-[0.5px] mb-0.5 h-3 w-28 rounded-lg" />
        )}
      </div>
    </div>
  )
}
