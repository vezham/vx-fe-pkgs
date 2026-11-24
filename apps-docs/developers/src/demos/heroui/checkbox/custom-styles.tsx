// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Checkbox } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Checkbox id="custom">
      <Checkbox.Content>
        <Checkbox.Control className="bg-success-soft before:bg-success">
          <Checkbox.Indicator className="**:data-[slot=checkbox-default-indicator--checkmark]:text-success-foreground" />
        </Checkbox.Control>
        Custom styled checkbox
      </Checkbox.Content>
    </Checkbox>
  )
}
