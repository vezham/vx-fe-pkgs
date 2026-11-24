// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Surface, TextArea } from '@vezham/react-v3'

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <TextArea
        className="w-full min-w-[280px]"
        placeholder="Describe your product"
        variant="secondary"
      />
    </Surface>
  )
}
