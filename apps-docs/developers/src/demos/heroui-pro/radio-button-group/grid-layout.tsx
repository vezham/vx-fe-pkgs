// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const deliveryOptions = [
  {
    description: '4-10 business days',
    price: 5,
    title: 'Standard',
    value: 'standard'
  },
  {
    description: '2-5 business days',
    price: 16,
    title: 'Express',
    value: 'express'
  },
  {
    description: '1 business day',
    price: 25,
    title: 'Super Fast',
    value: 'super-fast'
  }
]

export function GridLayout() {
  return (
    <RadioButtonGroup
      className="w-full max-w-2xl grid-cols-1 sm:grid-cols-3"
      defaultValue="express"
      layout="grid"
      name="delivery"
      variant="secondary">
      <Label className="col-span-full">Delivery method</Label>
      {deliveryOptions.map(option => (
        <RadioButtonGroup.Item key={option.value} value={option.value}>
          <RadioButtonGroup.Indicator />
          <RadioButtonGroup.ItemContent>
            <div className="flex flex-col gap-1">
              <Label>{option.title}</Label>
              <Description>{option.description}</Description>
            </div>
            <NumberValue
              className="mt-2 text-sm font-semibold"
              currency="USD"
              style="currency"
              value={option.price}
            />
          </RadioButtonGroup.ItemContent>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  )
}
