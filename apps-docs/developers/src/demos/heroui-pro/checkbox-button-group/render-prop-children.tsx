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

export function RenderPropChildren() {
  return (
    <CheckboxButtonGroup
      className="w-[360px]"
      defaultValue={['storage']}
      name="features-render"
      variant="secondary">
      <Label>Select features</Label>
      {addons.map(addon => (
        <CheckboxButtonGroup.Item key={addon.value} value={addon.value}>
          {({ isSelected }) => (
            <>
              <CheckboxButtonGroup.Indicator />
              <CheckboxButtonGroup.ItemContent>
                <Label>{addon.title}</Label>
                <Description>{addon.description}</Description>
                <NumberValue
                  className={`mt-2 text-sm font-semibold ${isSelected ? 'text-accent' : ''}`}
                  currency="USD"
                  maximumFractionDigits={0}
                  style="currency"
                  value={addon.price}>
                  <NumberValue.Suffix>
                    <span className="text-muted text-xs font-normal">/mo</span>
                  </NumberValue.Suffix>
                </NumberValue>
              </CheckboxButtonGroup.ItemContent>
            </>
          )}
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
