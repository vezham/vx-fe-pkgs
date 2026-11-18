import type { ComponentProps } from 'react'

import { ScrollShadow, cn } from '@vezham/react-v3'

import { FeatureCard, type FeatureCardProps } from '../shared/feature-card'
import { FeatureCardAction } from '../shared/feature-card-action'

export type CardGalleryProps = ComponentProps<'nav'> & { scrollLabel?: string }
export type CardGalleryGroupProps = ComponentProps<'li'> & {
  variant?: 'feature' | 'tiles'
}
export type CardGalleryCardProps = FeatureCardProps & {
  variant?: 'feature' | 'tile'
}

const CardGalleryRoot = ({
  children,
  scrollLabel = 'Scrollable cards',
  'aria-label': label = 'Card gallery',
  ...props
}: CardGalleryProps) => (
  <nav {...props} aria-label={label}>
    <ScrollShadow
      aria-label={scrollLabel}
      orientation="horizontal"
      role="region"
      tabIndex={0}
      className="w-full overflow-x-auto">
      <ul className="flex items-stretch gap-5 px-1 py-4">{children}</ul>
    </ScrollShadow>
  </nav>
)

const CardGalleryGroup = ({
  variant = 'feature',
  className,
  ...props
}: CardGalleryGroupProps) => (
  <li
    {...props}
    className={cn(
      'flex w-[309px] shrink-0 max-[374px]:w-[260px]',
      variant === 'tiles'
        ? 'flex-col gap-5 min-[737px]:w-[313px]'
        : 'min-[737px]:w-[400px]',
      className
    )}
  />
)

const CardGalleryCard = ({
  variant = 'feature',
  ...props
}: CardGalleryCardProps) => <FeatureCard {...props} variant={variant} />

export const CardGallery = Object.assign(CardGalleryRoot, {
  Group: CardGalleryGroup,
  Card: CardGalleryCard,
  Action: FeatureCardAction
})

export type { FeatureCardActionProps as CardGalleryActionProps } from '../shared/feature-card-action'
