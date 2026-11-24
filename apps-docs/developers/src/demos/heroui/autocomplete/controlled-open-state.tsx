// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import {
  Autocomplete,
  Button,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  useFilter
} from '@vezham/react-v3'

export function ControlledOpenState() {
  const [isOpen, setIsOpen] = useState(false)
  const { contains } = useFilter({ sensitivity: 'base' })

  const items = [
    { id: 'florida', name: 'Florida' },
    { id: 'delaware', name: 'Delaware' },
    { id: 'california', name: 'California' },
    { id: 'texas', name: 'Texas' },
    { id: 'new-york', name: 'New York' },
    { id: 'washington', name: 'Washington' }
  ]

  return (
    <div className="space-y-4">
      <Autocomplete
        className="w-[256px]"
        isOpen={isOpen}
        placeholder="Select one"
        selectionMode="single"
        onOpenChange={setIsOpen}>
        <Label>State</Label>
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
      <Button onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'} Autocomplete
      </Button>
      <p className="text-muted text-sm">
        Autocomplete is {isOpen ? 'open' : 'closed'}
      </p>
    </div>
  )
}
