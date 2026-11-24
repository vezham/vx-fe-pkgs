// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Slider } from '@vezham/react-v3'

export function VerticalWithStepsAndMarks() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Slider
        className="h-full"
        defaultValue={0.4}
        maxValue={1}
        orientation="vertical"
        step={0.1}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Steps />
          <Slider.Thumb />
        </Slider.Track>
        <Slider.Marks>
          <Slider.Mark value={0} />
          <Slider.Mark value={0.5} />
          <Slider.Mark value={1} />
        </Slider.Marks>
      </Slider>
    </div>
  )
}
