// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Surface } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Surface
      className="border-accent/15 from-accent/8 via-surface to-surface-secondary w-full max-w-sm rounded-xl border bg-linear-to-br p-4"
      variant="default">
      <h3 className="text-foreground text-sm font-semibold">
        Billing overview
      </h3>
      <p className="text-muted text-sm">
        View invoices and payment methods in one place.
      </p>
    </Surface>
  )
}
