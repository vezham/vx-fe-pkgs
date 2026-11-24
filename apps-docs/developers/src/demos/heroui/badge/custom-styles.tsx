// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Avatar, Badge } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Badge.Anchor>
      <Avatar>
        <Avatar.Image
          alt="Kate Wilson"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
        />
        <Avatar.Fallback>KW</Avatar.Fallback>
      </Avatar>
      <Badge
        className="min-w-5 font-semibold tabular-nums"
        color="accent"
        size="sm"
        variant="soft">
        5
      </Badge>
    </Badge.Anchor>
  )
}
