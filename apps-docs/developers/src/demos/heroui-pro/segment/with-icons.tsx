// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import ChartColumn from '@gravity-ui/icons/ChartColumn'
import Gear from '@gravity-ui/icons/Gear'
import LayoutList from '@gravity-ui/icons/LayoutList'
import PersonFill from '@gravity-ui/icons/PersonFill'

import { Segment } from '@vezham/react-pro-v3'

const iconTabs = [
  { icon: <LayoutList />, id: 'dashboard', label: 'Dashboard' },
  { icon: <ChartColumn />, id: 'analytics', label: 'Analytics' },
  { icon: <PersonFill />, id: 'team', label: 'Team' },
  { icon: <Gear />, id: 'settings', label: 'Settings' }
]

export function WithIcons() {
  return (
    <Segment defaultSelectedKey="dashboard">
      {iconTabs.map(tab => (
        <Segment.Item key={tab.id} id={tab.id}>
          {tab.icon}
          {tab.label}
        </Segment.Item>
      ))}
    </Segment>
  )
}
