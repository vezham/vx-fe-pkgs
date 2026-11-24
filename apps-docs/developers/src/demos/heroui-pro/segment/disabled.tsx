// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Segment } from '@vezham/react-pro-v3'

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' }
]

export function Disabled() {
  return (
    <Segment isDisabled defaultSelectedKey="dashboard">
      {tabs.map(tab => (
        <Segment.Item key={tab.id} id={tab.id}>
          {tab.label}
        </Segment.Item>
      ))}
    </Segment>
  )
}
