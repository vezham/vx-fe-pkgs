// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import type { Key } from '@vezham/react-v3'
import {
  Autocomplete,
  Description,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  Tag,
  TagGroup,
  useFilter
} from '@vezham/react-v3'

const TEAMMATES = [
  { id: 'sarah', name: 'Sarah Chen', role: 'Product Design' },
  { id: 'marcus', name: 'Marcus Lee', role: 'Engineering' },
  { id: 'priya', name: 'Priya Patel', role: 'Data Science' },
  { id: 'jordan', name: 'Jordan Kim', role: 'Customer Success' },
  { id: 'alex', name: 'Alex Rivera', role: 'Marketing' }
] as const

export function CustomStyles() {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])

  const onRemoveTags = (keys: Set<Key>) => {
    setSelectedKeys(prev => prev.filter(key => !keys.has(key)))
  }

  return (
    <div className="w-full max-w-sm pt-6">
      <Autocomplete
        className="w-full gap-1.5"
        placeholder="Search teammates..."
        selectionMode="multiple"
        value={selectedKeys}
        onChange={keys => setSelectedKeys((keys ?? []) as Key[])}>
        <Label className="text-foreground font-medium">Assignees</Label>
        <Description>
          People who will be notified when this task updates.
        </Description>
        <Autocomplete.Trigger className="border-border/80 bg-surface ring-accent/5 focus-within:border-accent/25 focus-within:ring-accent/15 dark:border-border/90 dark:bg-surface dark:ring-accent/10 dark:focus-within:border-accent/35 rounded-xl border shadow-sm ring-1 transition-[box-shadow,border-color] focus-within:ring-2">
          <Autocomplete.Value>
            {({ defaultChildren, isPlaceholder, state }) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren
              }

              const selectedItemsKeys = state.selectedItems.map(
                item => item.key
              )

              return (
                <TagGroup size="sm" onRemove={onRemoveTags}>
                  <TagGroup.List>
                    {selectedItemsKeys.map(selectedItemKey => {
                      const teammate = TEAMMATES.find(
                        member => member.id === selectedItemKey
                      )

                      if (!teammate) return null

                      return (
                        <Tag
                          key={teammate.id}
                          className="border-accent/15 bg-accent/8 text-foreground dark:border-accent/25 dark:bg-accent/12 border"
                          id={teammate.id}>
                          {teammate.name}
                        </Tag>
                      )
                    })}
                  </TagGroup.List>
                </TagGroup>
              )
            }}
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover className="border-border/80 bg-surface dark:border-border/90 dark:bg-surface overflow-hidden rounded-xl border shadow-xl ring-1 ring-black/3 dark:ring-white/5">
          <Autocomplete.Filter filter={contains}>
            <SearchField
              autoFocus
              aria-label="Search by name or role"
              name="search"
              variant="secondary">
              <SearchField.Group className="border-separator bg-surface-secondary/50 border-b">
                <SearchField.SearchIcon className="text-muted" />
                <SearchField.Input placeholder="Search by name or role..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox
              className="p-1.5"
              renderEmptyState={() => (
                <EmptyState>No teammates found</EmptyState>
              )}>
              {TEAMMATES.map(teammate => (
                <ListBox.Item
                  key={teammate.id}
                  className="data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5 dark:data-[focused=true]:bg-accent/15 dark:data-[selected=true]:bg-accent/8 rounded-lg"
                  id={teammate.id}
                  textValue={`${teammate.name} ${teammate.role}`}>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-foreground text-sm font-medium">
                      {teammate.name}
                    </span>
                    <span className="text-muted text-xs">{teammate.role}</span>
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    </div>
  )
}
