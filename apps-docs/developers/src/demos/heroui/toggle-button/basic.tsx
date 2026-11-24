// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Heart } from '@gravity-ui/icons'

import { ToggleButton } from '@vezham/react-v3'

export function Basic() {
  return (
    <ToggleButton>
      <Heart />
      Like
    </ToggleButton>
  )
}
