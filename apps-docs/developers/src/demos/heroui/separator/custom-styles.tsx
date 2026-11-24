// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Separator } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="max-w-xs space-y-4">
      <p className="text-foreground text-sm font-medium">Account settings</p>
      <Separator className="bg-separator-secondary" />
      <div className="text-muted flex items-center gap-3 text-sm">
        <span>Profile</span>
        <Separator className="bg-separator h-4" orientation="vertical" />
        <span>Billing</span>
        <Separator className="bg-separator h-4" orientation="vertical" />
        <span>Security</span>
      </div>
    </div>
  )
}
