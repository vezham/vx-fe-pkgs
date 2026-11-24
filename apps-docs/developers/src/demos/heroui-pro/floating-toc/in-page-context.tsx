// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { FloatingToc } from '@vezham/react-pro-v3'

const sections = [
  {
    id: 'intro',
    label: 'Introduction',
    text: 'Welcome to the documentation. This guide covers everything you need to get started with the library, from installation to advanced usage patterns.'
  },
  {
    id: 'setup',
    label: 'Getting Started',
    text: 'Install the package using your preferred package manager. The library supports npm, yarn, and pnpm out of the box with zero configuration needed.'
  },
  {
    id: 'api',
    label: 'API Reference',
    text: 'The API provides a clean interface for building composable components. Each component follows the compound pattern, giving you full control over rendering.'
  },
  {
    id: 'examples',
    label: 'Examples',
    text: 'Browse through real-world examples to see how the components work in production scenarios. Each example is fully functional and can be copied directly.'
  },
  {
    id: 'faq',
    label: 'FAQ',
    text: 'Find answers to the most commonly asked questions about the library, including migration guides, browser support, and accessibility compliance.'
  }
]

export function InPageContext() {
  const [activeId, setActiveId] = useState('intro')

  return (
    <div className="border-border relative h-[420px] w-[640px] overflow-hidden rounded-xl border">
      <div className="h-full overflow-auto p-8 pr-16">
        {sections.map(section => (
          <div key={section.id} className="mb-10 last:mb-0">
            <h2
              className={`text-base font-semibold ${section.id === activeId ? 'text-accent' : ''}`}>
              {section.label}
            </h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              {section.text}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 right-3 -translate-y-1/2">
        <FloatingToc>
          <FloatingToc.Trigger aria-label="Table of contents">
            {sections.map(section => (
              <FloatingToc.Bar
                key={section.id}
                active={section.id === activeId}
              />
            ))}
          </FloatingToc.Trigger>
          <FloatingToc.Content>
            {sections.map(section => (
              <FloatingToc.Item
                key={section.id}
                active={section.id === activeId}
                onClick={() => setActiveId(section.id)}>
                {section.label}
              </FloatingToc.Item>
            ))}
          </FloatingToc.Content>
        </FloatingToc>
      </div>
    </div>
  )
}
