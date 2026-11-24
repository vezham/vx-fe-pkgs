// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorSlider, Label } from '@vezham/react-v3'

export function AlphaChannel() {
  return (
    <ColorSlider
      channel="alpha"
      className="w-full max-w-xs"
      defaultValue="hsla(0, 100%, 50%, 0.5)">
      <Label>Alpha</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  )
}
