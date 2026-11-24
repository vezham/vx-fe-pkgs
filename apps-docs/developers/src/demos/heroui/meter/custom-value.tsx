// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, Meter } from '@vezham/react-v3'

export function CustomValue() {
  return (
    <Meter
      className="w-64"
      formatOptions={{ currency: 'USD', style: 'currency' }}
      maxValue={1000}
      minValue={0}
      value={750}>
      <Label>Revenue</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  )
}
