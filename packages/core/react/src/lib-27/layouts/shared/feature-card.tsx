import type { ComponentProps, ReactNode } from 'react'

import { Card, cn } from '@vezham/react-v3'

export type FeatureCardProps = Omit<ComponentProps<'div'>, 'title'> & {
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  headingAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

type Variant = 'bento' | 'feature' | 'tile'

const cardClasses: Record<Variant, string> = {
  bento: 'gap-5 p-7 pb-20 sm:p-8 sm:pb-20',
  feature:
    'h-[450px] w-full shrink-0 gap-3 rounded-[28px] p-7 pb-16 min-[737px]:h-[500px]',
  tile: 'h-[215px] shrink-0 gap-3 rounded-[28px] p-7 pb-16 min-[737px]:h-[240px]'
}

const titleClasses: Record<Variant, string> = {
  bento: 'text-2xl leading-tight sm:text-3xl',
  feature:
    'text-[21px] leading-[25px] min-[737px]:text-[28px] min-[737px]:leading-8',
  tile: 'col-span-full text-lg leading-6 min-[737px]:text-xl'
}

const descriptionClasses: Record<Variant, string> = {
  bento: 'text-sm leading-snug',
  feature: 'text-sm leading-snug',
  tile: 'col-span-full text-xs leading-4 min-[737px]:text-sm min-[737px]:leading-5'
}

export const FeatureCard = ({
  variant,
  title,
  eyebrow,
  description,
  icon,
  action,
  headingAs: Heading = 'h2',
  children,
  className,
  ...props
}: FeatureCardProps & { variant: Variant }) => (
  <Card
    {...props}
    className={cn(
      'vx-feature-card relative min-w-0 overflow-hidden',
      cardClasses[variant],
      className
    )}>
    <Card.Header
      className={
        variant === 'tile'
          ? 'grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2'
          : 'gap-3'
      }>
      {variant === 'tile' ? (
        <>
          {icon}
          {eyebrow != null && (
            <p className="text-xs font-semibold tracking-wide uppercase">
              {eyebrow}
            </p>
          )}
        </>
      ) : (
        (eyebrow != null || icon != null) && (
          <p className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
            {icon}
            {eyebrow}
          </p>
        )
      )}
      <Card.Title
        className={cn(
          'max-w-sm font-semibold tracking-tight text-inherit',
          titleClasses[variant]
        )}
        render={({ children, ...props }) => (
          <Heading {...props}>{children}</Heading>
        )}>
        {title}
      </Card.Title>
      {description != null && (
        <Card.Description
          className={cn(
            'max-w-xs text-inherit opacity-90',
            descriptionClasses[variant]
          )}>
          {description}
        </Card.Description>
      )}
    </Card.Header>
    {children != null && (
      <Card.Content
        className={cn(
          'flex flex-1 flex-col justify-center',
          variant !== 'bento' && 'min-h-0'
        )}>
        {children}
      </Card.Content>
    )}
    {action}
  </Card>
)
