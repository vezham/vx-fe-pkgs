// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleCheckFill from '@gravity-ui/icons/CircleCheckFill'

import { CheckboxButtonGroup, NumberValue } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const notifications = [
  {
    description: 'Weekly product updates and tips',
    subscribers: 4200,
    value: 'product-updates'
  },
  {
    description: 'Security alerts and maintenance notices',
    subscribers: 8100,
    value: 'security-alerts'
  },
  {
    description: 'Promotions, deals, and special offers',
    subscribers: 2300,
    value: 'marketing'
  }
]

export function CustomIndicator() {
  return (
    <CheckboxButtonGroup
      className="w-full max-w-3xl grid-cols-3"
      defaultValue={['product-updates', 'security-alerts']}
      layout="grid"
      name="notifications"
      variant="secondary">
      <Label className="col-span-full">Notification preferences</Label>
      {notifications.map(item => (
        <CheckboxButtonGroup.Item key={item.value} value={item.value}>
          <CheckboxButtonGroup.Indicator>
            <CircleCheckFill />
          </CheckboxButtonGroup.Indicator>
          <CheckboxButtonGroup.ItemContent>
            <Label className="capitalize">
              {item.value.replace(/-/g, ' ')}
            </Label>
            <Description>{item.description}</Description>
            <NumberValue
              className="mt-3 text-sm font-semibold"
              maximumFractionDigits={0}
              value={item.subscribers}>
              <NumberValue.Suffix>
                <span className="text-muted text-xs font-normal">
                  {' '}
                  subscribers
                </span>
              </NumberValue.Suffix>
            </NumberValue>
          </CheckboxButtonGroup.ItemContent>
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
