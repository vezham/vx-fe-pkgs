// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Typography } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="border-border/80 bg-surface-secondary flex max-w-md flex-col gap-2 rounded-xl border p-4">
      <Typography
        className="text-accent text-xs font-medium tracking-wide uppercase"
        type="body-xs">
        Changelog
      </Typography>
      <Typography
        className="text-foreground font-semibold tracking-tight"
        type="h4">
        Faster search results
      </Typography>
      <Typography className="text-muted text-sm leading-relaxed" type="body-sm">
        Queries now return in under 200ms thanks to an improved index.
      </Typography>
    </div>
  )
}
