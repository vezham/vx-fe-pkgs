// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Kbd } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="flex items-center gap-3">
      <Kbd className="bg-accent-soft text-accent-soft-foreground rounded-lg px-2.5">
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>
      <Kbd className="bg-default text-muted rounded-lg px-2.5">
        <Kbd.Abbr keyValue="shift" />
        <Kbd.Content>P</Kbd.Content>
      </Kbd>
    </div>
  )
}
