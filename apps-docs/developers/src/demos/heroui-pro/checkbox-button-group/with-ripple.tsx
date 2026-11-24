// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CheckboxButtonGroup, PressableFeedback } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const integrations = [
  {
    description: 'Connect your GitHub repositories',
    title: 'GitHub',
    value: 'github'
  },
  {
    description: 'Push notifications to Slack channels',
    title: 'Slack',
    value: 'slack'
  },
  {
    description: 'Sync tasks with Linear projects',
    title: 'Linear',
    value: 'linear'
  }
]

export function WithRipple() {
  return (
    <CheckboxButtonGroup
      className="w-full max-w-2xl grid-cols-3"
      defaultValue={['github']}
      layout="grid"
      name="integrations"
      variant="secondary">
      <Label className="col-span-full">Integrations</Label>
      {integrations.map(i => (
        <CheckboxButtonGroup.Item key={i.value} value={i.value}>
          <PressableFeedback.Ripple />
          <CheckboxButtonGroup.Indicator />
          <CheckboxButtonGroup.ItemContent>
            <Label>{i.title}</Label>
            <Description>{i.description}</Description>
          </CheckboxButtonGroup.ItemContent>
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
