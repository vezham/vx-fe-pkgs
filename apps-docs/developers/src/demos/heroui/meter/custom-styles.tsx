// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Meter } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Meter aria-label="Storage used" className="w-64" value={68}>
      <Label className="text-foreground font-medium">Storage used</Label>
      <Meter.Output className="text-muted tabular-nums" />
      <Meter.Track className="bg-default rounded-full">
        <Meter.Fill className="bg-warning rounded-full" />
      </Meter.Track>
    </Meter>
  )
}
