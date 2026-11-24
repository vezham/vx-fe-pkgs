// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleCheckFill from '@gravity-ui/icons/CircleCheckFill'

import { NumberValue, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const mailingLists = [
  {
    description: 'Last message sent an hour ago',
    subscribers: 621,
    value: 'newsletter'
  },
  {
    description: 'Last message sent 2 weeks ago',
    subscribers: 1200,
    value: 'existing-customers'
  },
  {
    description: 'Last message sent 4 days ago',
    subscribers: 2740,
    value: 'trial-users'
  }
]

export function CustomIndicator() {
  return (
    <RadioButtonGroup
      className="w-full max-w-2xl grid-cols-1 sm:grid-cols-3"
      defaultValue="newsletter"
      layout="grid"
      name="mailing-list"
      variant="secondary">
      <Label className="col-span-full">Select a mailing list</Label>
      {mailingLists.map(list => (
        <RadioButtonGroup.Item key={list.value} value={list.value}>
          <RadioButtonGroup.Indicator>
            <CircleCheckFill />
          </RadioButtonGroup.Indicator>
          <RadioButtonGroup.ItemContent>
            <Label className="capitalize">
              {list.value.replace(/-/g, ' ')}
            </Label>
            <Description>{list.description}</Description>
            <NumberValue
              className="mt-3 text-sm font-semibold"
              maximumFractionDigits={0}
              value={list.subscribers}>
              <NumberValue.Suffix>
                <span className="text-muted text-xs font-normal"> users</span>
              </NumberValue.Suffix>
            </NumberValue>
          </RadioButtonGroup.ItemContent>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  )
}
