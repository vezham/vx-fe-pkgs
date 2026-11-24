// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import {
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight
} from '@gravity-ui/icons'

import { Button, ButtonGroup } from '@vezham/react-v3'

export function Orientation() {
  return (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Horizontal</span>
        <ButtonGroup orientation="horizontal" variant="tertiary">
          <Button isIconOnly aria-label="Align left">
            <TextAlignLeft />
          </Button>
          <Button isIconOnly aria-label="Align center">
            <ButtonGroup.Separator />
            <TextAlignCenter />
          </Button>
          <Button isIconOnly aria-label="Align right">
            <ButtonGroup.Separator />
            <TextAlignRight />
          </Button>
          <Button isIconOnly aria-label="Justify">
            <ButtonGroup.Separator />
            <TextAlignJustify />
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Vertical</span>
        <ButtonGroup orientation="vertical" variant="tertiary">
          <Button isIconOnly aria-label="Align left">
            <TextAlignLeft />
          </Button>
          <Button isIconOnly aria-label="Align center">
            <ButtonGroup.Separator />
            <TextAlignCenter />
          </Button>
          <Button isIconOnly aria-label="Align right">
            <ButtonGroup.Separator />
            <TextAlignRight />
          </Button>
          <Button isIconOnly aria-label="Justify">
            <ButtonGroup.Separator />
            <TextAlignJustify />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
