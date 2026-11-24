// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorSlider, Label } from '@vezham/react-v3'

export function Disabled() {
  return (
    <ColorSlider
      isDisabled
      channel="hue"
      className="w-full max-w-xs"
      defaultValue="hsl(200, 100%, 50%)">
      <Label>Hue</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  )
}
