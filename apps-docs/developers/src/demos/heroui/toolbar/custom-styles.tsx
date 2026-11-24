// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Bold, Italic, Underline } from '@gravity-ui/icons'

import { ToggleButton, ToggleButtonGroup, Toolbar } from '@vezham/react-v3'

const toggleClass =
  'rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'

export function CustomStyles() {
  return (
    <Toolbar
      aria-label="Formatting toolbar"
      className="border-border/80 bg-surface-secondary gap-1 rounded-xl border p-1.5">
      <ToggleButtonGroup
        aria-label="Text style"
        className="gap-0.5"
        selectionMode="multiple">
        <ToggleButton
          isIconOnly
          aria-label="Bold"
          className={toggleClass}
          id="bold">
          <Bold />
        </ToggleButton>
        <ToggleButton
          isIconOnly
          aria-label="Italic"
          className={toggleClass}
          id="italic">
          <Italic />
        </ToggleButton>
        <ToggleButton
          isIconOnly
          aria-label="Underline"
          className={toggleClass}
          id="underline">
          <Underline />
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  )
}
