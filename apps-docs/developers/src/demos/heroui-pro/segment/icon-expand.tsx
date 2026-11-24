// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import Archive from '@gravity-ui/icons/Archive'
import Comment from '@gravity-ui/icons/Comment'
import House from '@gravity-ui/icons/House'
import Video from '@gravity-ui/icons/Video'

import { Segment } from '@vezham/react-pro-v3'

const tabs = [
  { icon: <House />, id: 'home', label: 'Home' },
  { icon: <Comment />, id: 'chat', label: 'Chat' },
  { icon: <Video />, id: 'meetings', label: 'Meetings' },
  { icon: <Archive />, id: 'inbox', label: 'Inbox' }
]

export function IconExpand() {
  return (
    <Segment defaultSelectedKey="meetings" variant="ghost">
      {tabs.map(tab => (
        <Segment.Item
          key={tab.id}
          className="w-auto"
          id={tab.id}
          style={{ gap: 0 }}>
          {({ isSelected }) => (
            <>
              {tab.icon}
              <span
                className="inline-grid transition-all duration-200 ease-out motion-reduce:transition-none"
                style={{
                  gridTemplateColumns: isSelected ? '1fr' : '0fr',
                  minWidth: 0,
                  opacity: isSelected ? 1 : 0
                }}>
                <span
                  className="overflow-hidden whitespace-nowrap transition-[padding] duration-200 ease-out motion-reduce:transition-none"
                  style={{
                    minWidth: 0,
                    paddingInlineStart: isSelected ? '0.375rem' : 0
                  }}>
                  {tab.label}
                </span>
              </span>
            </>
          )}
        </Segment.Item>
      ))}
    </Segment>
  )
}
