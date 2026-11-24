// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, NumberField } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <NumberField
      className="w-full max-w-48"
      defaultValue={2}
      minValue={1}
      name="guests"
      variant="secondary">
      <Label className="text-foreground font-medium">Guests</Label>
      <NumberField.Group className="bg-default rounded-xl">
        <NumberField.DecrementButton className="text-muted hover:text-foreground" />
        <NumberField.Input className="text-center tabular-nums" />
        <NumberField.IncrementButton className="text-muted hover:text-foreground" />
      </NumberField.Group>
    </NumberField>
  )
}
