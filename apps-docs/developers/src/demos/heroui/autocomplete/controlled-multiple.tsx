// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import type { Key } from '@vezham/react-v3'
import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  useFilter
} from '@vezham/react-v3'

export function ControlledMultiple() {
  const [selected, setSelected] = useState<Key[]>(['california', 'texas'])
  const { contains } = useFilter({ sensitivity: 'base' })

  const items = [
    { id: 'california', name: 'California' },
    { id: 'texas', name: 'Texas' },
    { id: 'florida', name: 'Florida' },
    { id: 'new-york', name: 'New York' },
    { id: 'illinois', name: 'Illinois' },
    { id: 'pennsylvania', name: 'Pennsylvania' }
  ]

  return (
    <div className="space-y-2">
      <Autocomplete
        className="w-[256px]"
        placeholder="Select states"
        selectionMode="multiple"
        value={selected}
        onChange={keys => setSelected(keys as Key[])}>
        <Label>States</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField
              autoFocus
              aria-label="Search states"
              name="search"
              variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search states..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox
              renderEmptyState={() => (
                <EmptyState>No results found</EmptyState>
              )}>
              {items.map(item => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
      <p className="text-muted text-sm">
        Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
      </p>
    </div>
  )
}
