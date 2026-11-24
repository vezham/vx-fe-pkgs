// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleCheckFill from '@gravity-ui/icons/CircleCheckFill'

import { PressableFeedback, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Chip, Description, Label, cn } from '@vezham/react-v3'

const subscriptions = [
  {
    billing: 'Billed at USD 99.99/year (US$ 8.33/month)',
    title: 'Annual',
    value: 'annual'
  },
  {
    badge: 'Save up to 50%',
    billing: 'Billed at USD 149.99/year (US$ 12.50/month)',
    title: 'Annual + Toolkit',
    value: 'annual-toolkit'
  }
]

export function SubscriptionPlans() {
  return (
    <RadioButtonGroup
      className="w-[min(400px,calc(100vw-2rem))]"
      defaultValue="annual"
      name="subscription">
      {subscriptions.map(sub => (
        <RadioButtonGroup.Item
          key={sub.value}
          className="data-[selected=true]:bg-foreground border-none ring-transparent transition-colors duration-150"
          value={sub.value}>
          {({ isSelected }) => (
            <>
              <PressableFeedback.Ripple />
              <RadioButtonGroup.Indicator className="top-1/2 -translate-y-1/2">
                <CircleCheckFill
                  className="text-[#e95f2a]"
                  height={24}
                  width={24}
                />
              </RadioButtonGroup.Indicator>
              <RadioButtonGroup.ItemContent>
                {sub.badge ? (
                  <Chip
                    className="absolute -top-1.5 -left-1 w-fit bg-[#e95f2a] text-black"
                    size="sm">
                    <Chip.Label>{sub.badge}</Chip.Label>
                  </Chip>
                ) : null}
                <Label
                  className={`text-xl font-bold ${isSelected ? 'text-background' : ''}`}>
                  {sub.title}
                </Label>
                <Description
                  className={cn(
                    'mt-1',
                    isSelected ? 'text-background/70' : ''
                  )}>
                  {sub.billing}
                </Description>
              </RadioButtonGroup.ItemContent>
            </>
          )}
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  )
}
