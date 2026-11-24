// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { FloatingToc } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'api-reference', label: 'API reference' },
  { id: 'troubleshooting', label: 'Troubleshooting' }
]

export function Controlled() {
  const [isOpen, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('overview')

  return (
    <div className="px-10 py-24">
      <div className="mb-6 flex items-center gap-3">
        <Button size="sm" variant="outline" onPress={() => setOpen(v => !v)}>
          {isOpen ? 'Close' : 'Open'} TOC
        </Button>
        <span className="text-muted inline-block w-24 text-sm">
          State: <strong>{isOpen ? 'open' : 'closed'}</strong>
        </span>
      </div>
      <FloatingToc open={isOpen} onOpenChange={setOpen}>
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
