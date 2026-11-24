// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Ellipsis, Gear, TrashBin } from '@gravity-ui/icons'

import { Button } from '@vezham/react-v3'

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly aria-label="More options" variant="tertiary">
        <Ellipsis />
      </Button>
      <Button isIconOnly aria-label="Settings" variant="secondary">
        <Gear />
      </Button>
      <Button isIconOnly aria-label="Delete" variant="danger">
        <TrashBin />
      </Button>
    </div>
  )
}
