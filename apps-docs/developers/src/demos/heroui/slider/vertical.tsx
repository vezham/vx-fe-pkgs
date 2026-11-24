// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Slider } from '@vezham/react-v3'

export function Vertical() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Slider className="h-full" defaultValue={30} orientation="vertical">
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
  )
}
