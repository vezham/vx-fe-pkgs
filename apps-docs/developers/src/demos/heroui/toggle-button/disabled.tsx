// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Heart, HeartFill } from '@gravity-ui/icons'

import { ToggleButton } from '@vezham/react-v3'

export function Disabled() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isDisabled>
        <Heart />
        Like
      </ToggleButton>
      <ToggleButton defaultSelected isDisabled>
        <HeartFill />
        Like
      </ToggleButton>
    </div>
  )
}
