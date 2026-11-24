// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Spinner } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="border-border bg-surface flex items-center gap-4 rounded-xl border px-5 py-4">
      <Spinner className="text-accent" size="sm" />
      <Spinner className="text-muted" size="md" />
      <Spinner className="text-success" size="lg" />
    </div>
  )
}
