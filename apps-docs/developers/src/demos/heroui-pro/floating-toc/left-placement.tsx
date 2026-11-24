// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { FloatingToc } from '@vezham/react-pro-v3'

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'api-reference', label: 'API reference' },
  { id: 'troubleshooting', label: 'Troubleshooting' }
]

export function LeftPlacement() {
  const [activeId, setActiveId] = useState('overview')

  return (
    <div className="px-10 py-24">
      <FloatingToc placement="left">
        <FloatingToc.Trigger aria-label="Table of contents">
          {tocItems.map(item => (
            <FloatingToc.Bar key={item.id} active={item.id === activeId} />
          ))}
        </FloatingToc.Trigger>
        <FloatingToc.Content>
          {tocItems.map(item => (
            <FloatingToc.Item
              key={item.id}
              active={item.id === activeId}
              onClick={() => setActiveId(item.id)}>
              {item.label}
            </FloatingToc.Item>
          ))}
        </FloatingToc.Content>
      </FloatingToc>
    </div>
  )
}
