// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { CircleXmark, Xmark } from '@gravity-ui/icons'

import { CloseButton } from '@vezham/react-v3'

export function WithCustomIcon() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <CircleXmark />
        </CloseButton>
        <span className="text-muted text-xs">Custom Icon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <Xmark />
        </CloseButton>
        <span className="text-muted text-xs">Alternative Icon</span>
      </div>
    </div>
  )
}
