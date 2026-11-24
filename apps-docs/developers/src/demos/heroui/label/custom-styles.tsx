// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Input, Label } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        className="text-accent text-xs font-semibold tracking-wide uppercase"
        htmlFor="repo">
        Repository
      </Label>
      <Input className="bg-field w-64" id="repo" placeholder="heroui/react" />
    </div>
  )
}
