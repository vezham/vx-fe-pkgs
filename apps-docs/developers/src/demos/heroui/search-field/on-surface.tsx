// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Description, Label, SearchField, Surface } from '@vezham/react-v3'

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <SearchField name="search" variant="secondary">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Enter keywords to search</Description>
      </SearchField>
      <SearchField name="search-2" variant="secondary">
        <Label>Advanced search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            className="w-full"
            placeholder="Advanced search..."
          />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Use filters to refine your search</Description>
      </SearchField>
    </Surface>
  )
}
