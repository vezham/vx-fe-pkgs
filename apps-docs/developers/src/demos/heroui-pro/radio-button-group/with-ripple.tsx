// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { PressableFeedback, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const regions = [
  {
    description: 'Lowest latency for US-based users',
    region: 'us-east-1',
    title: 'US East'
  },
  {
    description: 'Covers Western Europe and UK',
    region: 'eu-west-1',
    title: 'EU West'
  },
  {
    description: 'Optimized for Asia-Pacific traffic',
    region: 'ap-south-1',
    title: 'Asia Pacific'
  }
]

export function WithRipple() {
  return (
    <RadioButtonGroup
      className="w-full max-w-2xl grid-cols-1 sm:grid-cols-3"
      defaultValue="us-east-1"
      layout="grid"
      name="region"
      variant="secondary">
      <Label className="col-span-full">Deploy region</Label>
      {regions.map(r => (
        <RadioButtonGroup.Item key={r.region} value={r.region}>
          <PressableFeedback.Ripple className="text-muted/50" />
          <RadioButtonGroup.Indicator />
          <RadioButtonGroup.ItemContent>
            <Label>{r.title}</Label>
            <Description>{r.description}</Description>
            <span className="text-muted mt-2 font-mono text-xs">
              {r.region}
            </span>
          </RadioButtonGroup.ItemContent>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  )
}
