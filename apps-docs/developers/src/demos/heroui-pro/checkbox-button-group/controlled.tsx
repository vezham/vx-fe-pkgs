// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

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

export function Controlled() {
  const [selected, setSelected] = useState(['backups'])

  return (
    <div className="flex w-[360px] flex-col gap-4">
      <CheckboxButtonGroup
        name="addons-controlled"
        value={selected}
        variant="secondary"
        onChange={setSelected}>
        <Label>Add-ons</Label>
        <Description>Select the add-ons you need</Description>
        {addons.map(addon => (
          <CheckboxButtonGroup.Item key={addon.value} value={addon.value}>
            <CheckboxButtonGroup.Indicator />
            <CheckboxButtonGroup.ItemContent>
              <Label>{addon.title}</Label>
              <Description>{addon.description}</Description>
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
      <p className="text-muted text-sm">
        Selected:{' '}
        <span className="text-foreground font-medium">
          {selected.join(', ') || 'None'}
        </span>
      </p>
    </div>
  )
}
