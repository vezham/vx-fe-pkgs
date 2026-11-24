// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Spinner } from '@vezham/react-v3'

export function SpinnerSpeed() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="animate-[spin_1.5s_linear_infinite] motion-reduce:animate-none" />
        <span className="text-muted text-xs">Slow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <span className="text-muted text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="animate-[spin_0.4s_linear_infinite] motion-reduce:animate-none" />
        <span className="text-muted text-xs">Fast</span>
      </div>
    </div>
  )
}
