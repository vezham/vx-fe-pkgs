// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Description, Input, Label } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="flex w-64 flex-col gap-1">
      <Label htmlFor="workspace-slug">Workspace URL</Label>
      <Input id="workspace-slug" placeholder="acme" type="text" />
      <Description
        className="leading-relaxed tracking-wide"
        id="workspace-slug-hint">
        Lowercase letters and hyphens only. Used in app.heroui.com/acme
      </Description>
    </div>
  )
}
