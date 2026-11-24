// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import {
  Bold,
  Italic,
  Strikethrough,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  Underline
} from '@gravity-ui/icons'

import { ToggleButton, ToggleButtonGroup } from '@vezham/react-v3'

export function SelectionMode() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Single selection</span>
        <ToggleButtonGroup
          defaultSelectedKeys={['center']}
          selectionMode="single">
          <ToggleButton id="left">
            <TextAlignLeft />
            Left
          </ToggleButton>
          <ToggleButton id="center">
            <ToggleButtonGroup.Separator />
            <TextAlignCenter />
            Center
          </ToggleButton>
          <ToggleButton id="right">
            <ToggleButtonGroup.Separator />
            <TextAlignRight />
            Right
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Multiple selection</span>
        <ToggleButtonGroup
          defaultSelectedKeys={['bold', 'underline']}
          selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <Underline />
          </ToggleButton>
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough">
            <ToggleButtonGroup.Separator />
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}
