// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Slider } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={40}>
      <Label className="text-foreground font-medium">Brightness</Label>
      <Slider.Output className="text-muted text-xs tabular-nums" />
      <Slider.Track className="bg-default">
        <Slider.Fill className="bg-accent" />
        <Slider.Thumb className="bg-accent after:bg-accent-foreground" />
      </Slider.Track>
    </Slider>
  )
}
