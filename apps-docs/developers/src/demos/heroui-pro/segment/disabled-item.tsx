// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Segment } from '@vezham/react-pro-v3'

export function DisabledItem() {
  return (
    <Segment defaultSelectedKey="dashboard">
      <Segment.Item id="dashboard">Dashboard</Segment.Item>
      <Segment.Item isDisabled id="analytics">
        Analytics
      </Segment.Item>
      <Segment.Item id="reports">Reports</Segment.Item>
    </Segment>
  )
}
