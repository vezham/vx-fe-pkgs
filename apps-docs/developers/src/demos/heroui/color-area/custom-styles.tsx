// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorArea } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <ColorArea className="size-44 rounded-3xl" defaultValue="rgb(116, 52, 255)">
      <ColorArea.Thumb className="size-5 rounded-full border-4 border-white" />
    </ColorArea>
  )
}
