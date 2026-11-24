// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Spinner } from '@vezham/react-v3'

export function SpinnerColors() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="current" />
        <span className="text-muted text-xs">Current</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="accent" />
        <span className="text-muted text-xs">Accent</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-muted text-xs">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="warning" />
        <span className="text-muted text-xs">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="danger" />
        <span className="text-muted text-xs">Danger</span>
      </div>
    </div>
  )
}
