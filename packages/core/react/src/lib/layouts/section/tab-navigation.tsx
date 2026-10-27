import { type Key, useCallback } from 'react'

import { Tabs } from '@vezham/react-v3'

import type { AppNavigationItem } from '../../navigation'

type Props = {
  title: string
  tabs: AppNavigationItem[]
  selectedTabKey?: string
  onPanelIdChange?: (id: string) => void
  onTabChange?: (key: string) => void
  className?: string
}

export const SectionTabNavigation = ({
  title,
  tabs,
  selectedTabKey,
  onPanelIdChange,
  onTabChange,
  className
}: Props) => {
  const handleSelectedTabRef = useCallback(
    (element: HTMLDivElement | null) => {
      const panelId = element?.getAttribute('aria-controls')
      if (panelId) onPanelIdChange?.(panelId)
    },
    [onPanelIdChange]
  )

  if (tabs.length === 0) return null

  return (
    <Tabs
      selectedKey={selectedTabKey}
      className="contents"
      variant="primary"
      onSelectionChange={(key: Key) => onTabChange?.(String(key))}>
      <Tabs.ListContainer className={`max-w-full ${className ?? ''}`}>
        <Tabs.List aria-label={`${title} tabs`} className="min-w-max flex-nowrap">
          {tabs.map(tab => (
            <Tabs.Tab
              key={tab.key}
              id={tab.key}
              ref={tab.key === selectedTabKey ? handleSelectedTabRef : undefined}
              className="whitespace-nowrap">
              {tab.title}
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  )
}
