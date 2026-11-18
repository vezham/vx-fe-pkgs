import type { ComponentProps, ReactNode } from 'react'

import { ArrowRightUp } from '@vezham/icons-react'
import { Card, Link, cn } from '@vezham/react-v3'

export type FeatureCardActionProps = Omit<
  ComponentProps<typeof Link>,
  'children' | 'className'
> & {
  href: string
  'aria-label': string
  className?: string
  children?: ReactNode
}

export const FeatureCardAction = ({
  children,
  className,
  ...props
}: FeatureCardActionProps) => (
  <Card.Footer className="absolute inset-0 z-10 rounded-[inherit]">
    <Link
      {...props}
      className={cn(
        'group data-[focus-visible=true]:inset-ring-focus flex size-full cursor-pointer items-end justify-end rounded-[inherit] p-6 data-[focus-visible=true]:inset-ring-2',
        className
      )}>
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-full bg-[#ededf1] text-[#57575b] group-hover:bg-white">
        {children ?? <ArrowRightUp size={22} />}
      </span>
    </Link>
  </Card.Footer>
)
