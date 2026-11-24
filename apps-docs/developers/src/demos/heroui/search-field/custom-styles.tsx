// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, SearchField } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <SearchField className="w-full max-w-64" name="docs" variant="secondary">
      <Label className="text-foreground font-medium">Search docs</Label>
      <SearchField.Group className="bg-default rounded-xl">
        <SearchField.SearchIcon className="text-muted" />
        <SearchField.Input
          className="placeholder:text-muted"
          placeholder="Components, guides..."
        />
        <SearchField.ClearButton className="text-muted" />
      </SearchField.Group>
    </SearchField>
  )
}
