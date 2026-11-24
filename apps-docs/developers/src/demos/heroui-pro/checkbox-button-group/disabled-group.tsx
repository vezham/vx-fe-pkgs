// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CheckboxButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const features = [
  {
    description: 'Real-time threat detection and prevention',
    value: 'security'
  },
  {
    description: 'Cloud-based storage with automatic backups',
    value: 'storage'
  },
  {
    description: 'Usage reports and performance dashboards',
    value: 'analytics'
  }
]

export function DisabledGroup() {
  return (
    <CheckboxButtonGroup
      isDisabled
      className="w-[360px]"
      defaultValue={['security']}
      name="features-disabled"
      variant="secondary">
      <Label>Select features</Label>
      <Description>Feature selection is temporarily unavailable.</Description>
      {features.map(feature => (
        <CheckboxButtonGroup.Item key={feature.value} value={feature.value}>
          <CheckboxButtonGroup.Indicator />
          <CheckboxButtonGroup.ItemContent>
            <Label className="capitalize">{feature.value}</Label>
            <Description>{feature.description}</Description>
          </CheckboxButtonGroup.ItemContent>
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
