// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Input } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Input
      aria-label="Search projects"
      className="border-border/80 bg-default text-foreground placeholder:text-muted w-64 rounded-xl border"
      placeholder="Search projects..."
    />
  )
}
