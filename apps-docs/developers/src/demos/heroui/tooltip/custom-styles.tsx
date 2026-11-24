// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Button, Tooltip } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Tooltip delay={0}>
      <Button variant="secondary">Share link</Button>
      <Tooltip.Content className="border-border/80 bg-surface text-foreground rounded-lg border px-2.5 py-1 text-xs shadow-sm">
        <p>Copied to clipboard</p>
      </Tooltip.Content>
    </Tooltip>
  )
}
