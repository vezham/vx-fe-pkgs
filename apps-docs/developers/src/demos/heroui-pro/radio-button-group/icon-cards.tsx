// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleCheckFill,
  CrownDiamond,
  Flame,
  Gem,
  Layers3Diagonal,
  Rocket
} from '@gravity-ui/icons'

import { NumberValue, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Chip, Description, Label } from '@vezham/react-v3'

const tiers = [
  {
    badge: 'Most popular',
    description: 'For freelancers and solo makers shipping fast.',
    icon: <Layers3Diagonal />,
    monthly: 12,
    title: 'Starter',
    value: 'starter'
  },
  {
    description: 'For small teams scaling their product.',
    icon: <Flame />,
    monthly: 29,
    title: 'Growth',
    value: 'growth'
  },
  {
    description: 'For companies with advanced compliance needs.',
    icon: <Rocket />,
    monthly: 59,
    title: 'Business',
    value: 'business'
  },
  {
    description: 'Dedicated infra, SLA, and custom integrations.',
    icon: <Gem />,
    monthly: 149,
    title: 'Scale',
    value: 'scale'
  },
  {
    description: 'White-glove onboarding, custom contracts.',
    icon: <CrownDiamond />,
    monthly: 299,
    title: 'Enterprise',
    value: 'enterprise'
  }
]

export function IconCards() {
  return (
    <RadioButtonGroup
      className="w-[min(520px,calc(100vw-2rem))]"
      defaultValue="starter"
      name="icon-card">
      <Label>Choose your workspace plan</Label>
      {tiers.map(tier => (
        <RadioButtonGroup.Item
          key={tier.value}
          className="bg-default"
          value={tier.value}>
          <RadioButtonGroup.Indicator>
            <CircleCheckFill />
          </RadioButtonGroup.Indicator>
          <RadioButtonGroup.ItemContent>
            <div className="flex items-center gap-3">
              <span className="bg-surface shadow-surface flex size-8 items-center justify-center rounded-lg">
                {tier.icon}
              </span>
              <div className="flex gap-2">
                <Label className="text-sm font-semibold">{tier.title}</Label>
                {!!tier.badge && (
                  <Chip color="success" size="sm" variant="soft">
                    <Chip.Label>{tier.badge}</Chip.Label>
                  </Chip>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <NumberValue
                className="text-2xl font-bold"
                currency="USD"
                maximumFractionDigits={0}
                style="currency"
                value={tier.monthly}>
                <NumberValue.Suffix>
                  <span className="text-muted text-sm font-normal">
                    {' '}
                    per month
                  </span>
                </NumberValue.Suffix>
              </NumberValue>
            </div>
            <Description className="mt-1">{tier.description}</Description>
          </RadioButtonGroup.ItemContent>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  )
}
