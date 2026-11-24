// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Slider } from '@vezham/react-v3'

export function WithSteps() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={40} step={10}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Steps />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  )
}
