// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { CloseButton } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <CloseButton
      aria-label="Close"
      className="bg-default text-muted hover:bg-default-hover hover:text-foreground size-8 rounded-full active:scale-95"
    />
  )
}
