// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Globe, Plus, TrashBin } from '@gravity-ui/icons'

import { Button, ButtonGroup } from '@vezham/react-v3'

export function WithIcons() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-muted text-sm">With icons</p>
        <ButtonGroup variant="secondary">
          <Button>
            <Globe />
            Search
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <Plus />
            Add
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <TrashBin />
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-muted text-sm">Icon only buttons</p>
        <ButtonGroup variant="tertiary">
          <Button isIconOnly aria-label="Search">
            <Globe />
          </Button>
          <Button isIconOnly aria-label="Add">
            <ButtonGroup.Separator />
            <Plus />
          </Button>
          <Button isIconOnly aria-label="Delete">
            <ButtonGroup.Separator />
            <TrashBin />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
