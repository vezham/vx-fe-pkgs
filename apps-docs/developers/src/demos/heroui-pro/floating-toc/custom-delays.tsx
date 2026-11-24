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

const delays = [
  { closeDelay: 0, label: 'Instant', openDelay: 0 },
  { closeDelay: 300, label: 'Default (200/300)', openDelay: 200 },
  { closeDelay: 500, label: 'Slow (600/500)', openDelay: 600 }
]

export function CustomDelays() {
  const [activeId, setActiveId] = useState('overview')

  return (
    <div className="flex items-center gap-12 px-10 py-24">
      {delays.map(({ closeDelay, label, openDelay }) => (
        <div key={label} className="flex flex-col items-center gap-3">
          <span className="text-muted text-xs">{label}</span>
          <FloatingToc closeDelay={closeDelay} openDelay={openDelay}>
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
      ))}
    </div>
  )
}
