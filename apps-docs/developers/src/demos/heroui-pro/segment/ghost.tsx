// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Segment } from '@vezham/react-pro-v3'

const tabs = [
  { id: '1w', label: '1W' },
  { id: '4w', label: '4W' },
  { id: '1y', label: '1Y' },
  { id: 'mtd', label: 'MTD' },
  { id: 'qtd', label: 'QTD' },
  { id: 'ytd', label: 'YTD' },
  { id: 'all', label: 'ALL' }
]

export function Ghost() {
  return (
    <Segment defaultSelectedKey="mtd" size="sm" variant="ghost">
      {tabs.map(tab => (
        <Segment.Item key={tab.id} id={tab.id}>
          {tab.label}
        </Segment.Item>
      ))}
    </Segment>
  )
}
