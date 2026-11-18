import type { ComponentProps } from 'react'

import { cn } from '@vezham/react-v3'

import { FeatureCard, type FeatureCardProps } from '../shared/feature-card'
import { FeatureCardAction } from '../shared/feature-card-action'

export type BentoProps = ComponentProps<'div'>
export type BentoCardProps = FeatureCardProps

const BentoRoot = ({ className, ...props }: BentoProps) => (
  <div
    {...props}
    className={cn('grid grid-cols-1 gap-4 md:grid-cols-3', className)}
  />
)

const BentoCard = (props: BentoCardProps) => (
  <FeatureCard {...props} variant="bento" />
)

export const Bento = Object.assign(BentoRoot, {
  Card: BentoCard,
  Action: FeatureCardAction
})

export type { FeatureCardActionProps as BentoActionProps } from '../shared/feature-card-action'
