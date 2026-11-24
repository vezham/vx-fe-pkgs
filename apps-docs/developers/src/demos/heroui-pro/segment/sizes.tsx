// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Segment } from '@vezham/react-pro-v3'

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' }
]

export function Sizes() {
  return (
    <div className="flex flex-col items-start gap-6">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-muted text-xs">{size}</span>
          <Segment defaultSelectedKey="dashboard" size={size}>
            {tabs.map(tab => (
              <Segment.Item key={tab.id} id={tab.id}>
                {tab.label}
              </Segment.Item>
            ))}
          </Segment>
        </div>
      ))}
    </div>
  )
}
