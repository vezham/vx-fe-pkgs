import { useState } from 'react'

import { useLocalStore } from '@vezham/hooks'
import { AltArrowDown } from '@vezham/icons-react'
import {
  Autocomplete,
  Button,
  Dropdown,
  Header,
  SearchField
} from '@vezham/react-v3'
import type { TamizhiProfile } from '@vezham/tamizhi-contracts'

import { Companion } from './companion'

interface Props {
  headingId: string
  profile: TamizhiProfile
  profiles: readonly TamizhiProfile[]
  onSelect: (id: string) => void
}

const EMPTY_RECENTS: string[] = []
const parseRecents = (value: unknown): string[] =>
  Array.isArray(value)
    ? [
        ...new Set(value.filter((id): id is string => typeof id === 'string'))
      ].slice(0, 4)
    : EMPTY_RECENTS

const matchesSearch = (text: string, query: string) =>
  text.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())

export const BotPicker = ({
  profile,
  profiles,
  onSelect,
  headingId
}: Props) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const recents = useLocalStore('tamizhi.recent-profiles', EMPTY_RECENTS, {
    parse: parseRecents
  })
  const defaultProfiles = profiles.filter(item => item.id === 'vezham-tamizhi')
  const recentProfiles = recents.value
    .filter(id => id !== profile.id && id !== 'vezham-tamizhi')
    .map(id => profiles.find(item => item.id === id))
    .filter((item): item is TamizhiProfile => Boolean(item))
    .slice(0, 3)
  const pinnedIds = new Set(defaultProfiles.map(item => item.id))
  const categories = new Map<string, TamizhiProfile[]>()
  for (const item of profiles) {
    if (pinnedIds.has(item.id)) continue
    const category = item.category ?? 'Other apps'
    const items = categories.get(category) ?? []
    items.push(item)
    categories.set(category, items)
  }
  const sections = [
    { id: 'default', title: 'General', items: defaultProfiles },
    ...[...categories.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, items]) => ({
        id: `category:${category}`,
        title: category,
        items
      }))
  ].filter(section => section.items.length > 0)

  const selectProfile = (id: string) => {
    if (id !== 'vezham-tamizhi') {
      recents.setValue(current =>
        [id, ...current.filter(value => value !== id)].slice(0, 4)
      )
    }
    onSelect(id)
  }

  return (
    <>
      <h1 id={headingId} className="tamizhi-welcome__question">
        Who’s helping?
        <Dropdown
          isOpen={isOpen}
          onOpenChange={open => {
            setIsOpen(open)
            if (!open) setQuery('')
          }}>
          <Dropdown.Trigger
            className="tamizhi-welcome__bot"
            aria-label="Choose an assistant">
            {profile.name}
            <AltArrowDown size={22} aria-hidden="true" />
          </Dropdown.Trigger>
          <Dropdown.Popover className="tamizhi-bots">
            <Autocomplete.Filter
              inputValue={query}
              onInputChange={setQuery}
              filter={matchesSearch}>
              <SearchField
                aria-label="Search assistants"
                className="tamizhi-bots__search"
                onKeyDown={event => {
                  if (event.key === 'Escape' && !query) setIsOpen(false)
                }}>
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search apps or categories…" />
                  <SearchField.ClearButton aria-label="Clear assistant search" />
                </SearchField.Group>
              </SearchField>
              <Dropdown.Menu
                aria-label="Assistants"
                className="tamizhi-bots__list"
                selectionMode="single"
                selectedKeys={[profile.id]}
                renderEmptyState={() => (
                  <p className="tamizhi-bots__empty">No matching assistants.</p>
                )}>
                {sections.map(section => (
                  <Dropdown.Section
                    key={section.id}
                    id={section.id}
                    aria-label={section.title}>
                    <Header>{section.title}</Header>
                    {section.items.map(item => (
                      <Dropdown.Item
                        key={item.id}
                        id={item.id}
                        textValue={`${item.name} ${item.category ?? 'Other apps'}`}
                        onAction={() => selectProfile(item.id)}>
                        {item.name}
                        <Dropdown.ItemIndicator />
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                ))}
              </Dropdown.Menu>
            </Autocomplete.Filter>
          </Dropdown.Popover>
        </Dropdown>
      </h1>
      {recentProfiles.length > 0 && (
        <div
          role="group"
          aria-label="Recent assistants"
          className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-2">
          {recentProfiles.map(item => (
            <Button
              key={item.id}
              size="sm"
              variant="secondary"
              className="max-w-full gap-1.5 rounded-full pr-3 pl-0.5"
              onPress={() => selectProfile(item.id)}>
              <Companion
                asImage
                size="small"
                previewSize={28}
                persona={item.persona}
                outfit={item.outfit}
                isAnimated={false}
              />
              <span className="truncate">{item.name}</span>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
