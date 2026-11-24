// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Slider } from '@vezham/react-v3'

export function CustomValueFormatting() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={60}
      formatOptions={{ currency: 'USD', style: 'currency' }}>
      <Label>Price</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  )
}
