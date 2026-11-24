// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Description, Label, Switch } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Switch id="autosave">
      <Switch.Content>
        <Switch.Control className="[--switch-control-bg-checked-hover:var(--success)] [--switch-control-bg-checked:var(--success)]">
          <Switch.Thumb />
        </Switch.Control>
        <div className="flex flex-col gap-0.5">
          <Label>Auto-save drafts</Label>
          <Description>Changes are saved as you type.</Description>
        </div>
      </Switch.Content>
    </Switch>
  )
}
