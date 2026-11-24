// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

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

export function Controlled() {
  const [value, setValue] = useState('pro')

  return (
    <div className="flex w-[min(360px,calc(100vw-2rem))] flex-col gap-4">
      <RadioButtonGroup
        name="plan-controlled"
        value={value}
        variant="secondary"
        onChange={setValue}>
        <Label>Select a plan</Label>
        <Description>Choose the plan that suits your needs</Description>
        {plans.map(plan => (
          <RadioButtonGroup.Item key={plan.value} value={plan.value}>
            <RadioButtonGroup.Indicator />
            <RadioButtonGroup.ItemContent>
              <Label className="capitalize">{plan.value}</Label>
              <Description>{plan.description}</Description>
              <NumberValue
                className="mt-2 text-sm font-semibold"
                currency="USD"
                maximumFractionDigits={0}
                style="currency"
                value={plan.price}>
                <NumberValue.Suffix>
                  <span className="text-muted text-xs font-normal">/mo</span>
                </NumberValue.Suffix>
              </NumberValue>
            </RadioButtonGroup.ItemContent>
          </RadioButtonGroup.Item>
        ))}
      </RadioButtonGroup>
      <p className="text-muted text-sm">
        Selected: <span className="text-foreground font-medium">{value}</span>
      </p>
    </div>
  )
}
