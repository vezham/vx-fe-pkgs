// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, ProgressCircle } from '@vezham/react-v3'

export function WithLabel() {
  return (
    <div className="flex items-center gap-3">
      <ProgressCircle aria-label="Loading" value={75}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <Label>75% Complete</Label>
    </div>
  )
}
