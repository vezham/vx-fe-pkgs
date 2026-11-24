// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Meter } from '@vezham/react-v3'

export function WithoutLabel() {
  return (
    <Meter aria-label="Storage usage" className="w-64" value={45}>
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  )
}
