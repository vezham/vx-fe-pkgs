// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ProgressBar } from '@vezham/react-v3'

export function WithoutLabel() {
  return (
    <ProgressBar aria-label="Loading progress" className="w-64" value={45}>
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  )
}
