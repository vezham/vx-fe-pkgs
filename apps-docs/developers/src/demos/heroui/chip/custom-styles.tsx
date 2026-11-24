// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Chip } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip className="bg-default-soft text-default-soft-foreground rounded-full px-3">
        Draft
      </Chip>
      <Chip className="bg-warning-soft text-warning-soft-foreground rounded-full px-3">
        In review
      </Chip>
      <Chip className="bg-success-soft text-success-soft-foreground rounded-full px-3">
        Published
      </Chip>
    </div>
  )
}
