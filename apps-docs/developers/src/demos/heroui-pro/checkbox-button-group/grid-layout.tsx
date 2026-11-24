// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CheckboxButtonGroup, NumberValue } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const addons = [
  {
    description: 'Automated daily backups',
    price: 5,
    title: 'Backups',
    value: 'backups'
  },
  {
    description: '24/7 monitoring and alerts',
    price: 12,
    title: 'Monitoring',
    value: 'monitoring'
  },
  {
    description: 'Priority email and chat support',
    price: 8,
    title: 'Support',
    value: 'support'
  }
]

export function GridLayout() {
  return (
    <CheckboxButtonGroup
      className="w-full max-w-2xl grid-cols-3"
      defaultValue={['backups', 'monitoring']}
      layout="grid"
      name="addons"
      variant="secondary">
      <Label className="col-span-full">Add-ons</Label>
      {addons.map(addon => (
        <CheckboxButtonGroup.Item key={addon.value} value={addon.value}>
          <CheckboxButtonGroup.Indicator />
          <CheckboxButtonGroup.ItemContent>
            <div className="flex flex-col gap-1">
              <Label>{addon.title}</Label>
              <Description>{addon.description}</Description>
            </div>
            <NumberValue
              className="mt-2 text-sm font-semibold"
              currency="USD"
              style="currency"
              value={addon.price}>
              <NumberValue.Suffix>
                <span className="text-muted text-xs font-normal">/mo</span>
              </NumberValue.Suffix>
            </NumberValue>
          </CheckboxButtonGroup.ItemContent>
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
