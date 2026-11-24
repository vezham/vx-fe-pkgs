// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { FloatingToc } from '@vezham/react-pro-v3'

const hierarchicalItems = [
  { id: 's1', label: 'Design principles', level: 1 },
  { id: 's1-1', label: 'Composability', level: 2 },
  { id: 's1-2', label: 'Accessibility first', level: 2 },
  { id: 's2', label: 'Getting started', level: 1 },
  { id: 's2-1', label: 'Installation', level: 2 },
  { id: 's2-2', label: 'Project setup', level: 2 },
  { id: 's3', label: 'Core components', level: 1 },
  { id: 's3-1', label: 'Layout primitives', level: 2 },
  { id: 's3-2', label: 'Interactive elements', level: 2 },
  { id: 's3-2-1', label: 'Buttons & actions', level: 3 },
  { id: 's3-2-2', label: 'Form controls', level: 3 },
  { id: 's3-3', label: 'Data display', level: 2 },
  { id: 's3-3-1', label: 'Tables', level: 3 },
  { id: 's3-3-2', label: 'Charts', level: 3 },
  { id: 's4', label: 'Theming', level: 1 },
  { id: 's4-1', label: 'Color tokens', level: 2 },
  { id: 's4-2', label: 'Dark mode', level: 2 },
  { id: 's5', label: 'Advanced patterns', level: 1 },
  { id: 's6', label: 'Changelog', level: 1 }
]

export function PressModeInPage() {
  const [activeId, setActiveId] = useState('s3')

  return (
    <div className="border-border relative h-[520px] w-[640px] overflow-hidden rounded-xl border">
      <div className="h-full overflow-auto p-8 pl-16">
        {hierarchicalItems
          .filter(item => item.level === 1)
          .map(section => (
            <div key={section.id} className="mb-10 last:mb-0">
              <h2
                className={`text-base font-semibold ${section.id === activeId ? 'text-accent' : ''}`}>
                {section.label}
              </h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
      </div>

      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <FloatingToc placement="left" triggerMode="press">
          <FloatingToc.Trigger aria-label="Table of contents">
            {hierarchicalItems.map(item => (
              <FloatingToc.Bar
                key={item.id}
                active={item.id === activeId}
                level={item.level}
              />
            ))}
          </FloatingToc.Trigger>
          <FloatingToc.Content>
            <span className="text-muted mb-1 block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase">
              Contents
            </span>
            {hierarchicalItems.map(item => (
              <FloatingToc.Item
                key={item.id}
                active={item.id === activeId}
                level={item.level}
                onClick={() => setActiveId(item.id)}>
                {item.label}
              </FloatingToc.Item>
            ))}
          </FloatingToc.Content>
        </FloatingToc>
      </div>
    </div>
  )
}
