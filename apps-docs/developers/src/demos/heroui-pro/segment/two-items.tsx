// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Segment } from '@vezham/react-pro-v3'

export function TwoItems() {
  return (
    <Segment defaultSelectedKey="monthly" size="sm">
      <Segment.Item id="monthly">Monthly</Segment.Item>
      <Segment.Item id="yearly">Yearly</Segment.Item>
    </Segment>
  )
}
