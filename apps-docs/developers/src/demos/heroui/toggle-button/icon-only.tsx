// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Bookmark, Heart } from '@gravity-ui/icons'

import { ToggleButton } from '@vezham/react-v3'

export function IconOnly() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isIconOnly aria-label="Like">
        <Heart />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Bookmark" variant="ghost">
        <Bookmark />
      </ToggleButton>
    </div>
  )
}
