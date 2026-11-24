// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useMemo, useState } from 'react'
import { ListBox, ListBoxItem } from 'react-aria-components/ListBox'
import { ListLayout, Virtualizer } from 'react-aria-components/Virtualizer'

import { FloatingToc } from '@vezham/react-pro-v3'

const generateLargeItemList = () => {
  const topics = [
    'Introduction',
    'Architecture',
    'Components',
    'State Management',
    'Routing',
    'Data Fetching',
    'Authentication',
    'Authorization',
    'Testing',
    'Performance',
    'Deployment',
    'Monitoring',
    'Error Handling',
    'Logging',
    'Caching',
    'Security',
    'Accessibility',
    'Internationalization',
    'Theming',
    'Animation'
  ]

  const items: { id: string; label: string; level: number }[] = []
  let idx = 0

  for (let t = 0; t < topics.length; t++) {
    const topic = topics[t]!

    items.push({ id: `v-${idx++}`, label: topic, level: 1 })
    const subCount = 2 + (t % 3)

    for (let j = 0; j < subCount; j++) {
      items.push({
        id: `v-${idx++}`,
        label: `${topic} — Part ${j + 1}`,
        level: 2
      })
      if (j % 2 === 0) {
        items.push({
          id: `v-${idx++}`,
          label: 'Implementation details',
          level: 3
        })
      }
    }
  }

  return items
}

const largeItems = generateLargeItemList()
const largeTopLevel = largeItems.filter(i => i.level === 1)

const itemToSectionMap = (() => {
  const map = new Map<string, string>()
  let currentSection = ''

  for (const item of largeItems) {
    if (item.level === 1) currentSection = item.id
    map.set(item.id, currentSection)
  }

  return map
})()

export function Virtualized() {
  const [activeId, setActiveId] = useState(largeItems[0]!.id)
  const selectedKeys = useMemo(() => new Set([activeId]), [activeId])
  const activeSectionId = itemToSectionMap.get(activeId) ?? activeId

  return (
    <div className="px-10 py-10">
      <FloatingToc triggerMode="press">
        <FloatingToc.Trigger aria-label="Table of contents">
          {largeTopLevel.map(item => (
            <FloatingToc.Bar
              key={item.id}
              active={item.id === activeSectionId}
            />
          ))}
        </FloatingToc.Trigger>
        <FloatingToc.Content className="w-72 overflow-hidden !p-0">
          <span className="text-muted block px-3 pt-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase">
            Contents ({largeItems.length} items)
          </span>
          <Virtualizer
            layout={ListLayout}
            layoutOptions={{ estimatedRowHeight: 32, padding: 6 }}>
            <ListBox
              aria-label="Table of contents"
              className="block h-[320px] overflow-auto outline-none"
              items={largeItems}
              selectedKeys={selectedKeys}
              selectionMode="single"
              onSelectionChange={keys => {
                const key = [...keys][0]

                if (key) setActiveId(String(key))
              }}>
              {item => (
                <ListBoxItem
                  className="floating-toc__item"
                  data-active={item.id === activeId || undefined}
                  textValue={item.label}
                  style={
                    item.level > 1
                      ? ({
                          '--floating-toc-level': item.level
                        } as React.CSSProperties)
                      : undefined
                  }>
                  {item.label}
                </ListBoxItem>
              )}
            </ListBox>
          </Virtualizer>
        </FloatingToc.Content>
      </FloatingToc>
    </div>
  )
}
