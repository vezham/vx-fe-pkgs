// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Heart } from '@gravity-ui/icons'

import { ToggleButton } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <ToggleButton className="border-border/80 bg-surface text-foreground data-[selected=true]:border-accent/30 data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent-soft-foreground [&_svg]:text-muted data-[selected=true]:[&_svg]:text-accent gap-2 rounded-full border px-4 shadow-sm">
      <Heart />
      Save article
    </ToggleButton>
  )
}
