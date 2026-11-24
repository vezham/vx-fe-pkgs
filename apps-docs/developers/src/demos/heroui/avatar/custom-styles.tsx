// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Avatar } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Avatar className="rounded-lg">
      <Avatar.Image
        alt="John Doe"
        src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
      />
      <Avatar.Fallback className="rounded-lg">JD</Avatar.Fallback>
    </Avatar>
  )
}
