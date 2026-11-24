// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import React from 'react'

import { Button, Description, Label, SearchField } from '@vezham/react-v3'

export function Controlled() {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex flex-col gap-4">
      <SearchField name="search" value={value} onChange={setValue}>
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Current value: {value || '(empty)'}</Description>
      </SearchField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue('')}>
          Clear
        </Button>
        <Button variant="tertiary" onPress={() => setValue('example query')}>
          Set example
        </Button>
      </div>
    </div>
  )
}
