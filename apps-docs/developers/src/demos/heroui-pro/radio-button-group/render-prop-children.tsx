// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const plans = [
  {
    description: 'For individuals and small projects',
    price: 5,
    value: 'starter'
  },
  { description: 'For growing teams and businesses', price: 15, value: 'pro' },
  {
    description: 'For large organizations at scale',
    price: 45,
    value: 'enterprise'
  }
]

export function RenderPropChildren() {
  return (
    <RadioButtonGroup
      className="w-[min(360px,calc(100vw-2rem))]"
      defaultValue="pro"
      name="plan-render"
      variant="secondary">
      <Label>Select a plan</Label>
      {plans.map(plan => (
        <RadioButtonGroup.Item key={plan.value} value={plan.value}>
          {({ isSelected }) => (
            <>
              <RadioButtonGroup.Indicator />
              <RadioButtonGroup.ItemContent>
                <Label className="capitalize">{plan.value}</Label>
                <Description>{plan.description}</Description>
                <NumberValue
                  className={`mt-2 text-sm font-semibold ${isSelected ? 'text-accent' : ''}`}
                  currency="USD"
                  maximumFractionDigits={0}
                  style="currency"
                  value={plan.price}>
                  <NumberValue.Suffix>
                    <span className="text-muted text-xs font-normal">/mo</span>
                  </NumberValue.Suffix>
                </NumberValue>
              </RadioButtonGroup.ItemContent>
            </>
          )}
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  )
}
