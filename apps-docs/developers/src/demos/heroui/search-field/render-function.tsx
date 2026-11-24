// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Label, SearchField } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <SearchField
      name="search"
      render={props => <div {...props} data-custom="foo" />}>
      <Label>Search</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
}
