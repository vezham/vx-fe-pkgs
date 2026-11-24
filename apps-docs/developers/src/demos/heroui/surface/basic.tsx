// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Surface } from '@vezham/react-v3'

export function Basic() {
  return (
    <Surface
      className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
      variant="default">
      <h3 className="text-foreground text-base font-semibold">
        Surface Content
      </h3>
      <p className="text-muted text-sm">
        This is a default surface variant. It uses bg-surface styling.
      </p>
    </Surface>
  )
}
