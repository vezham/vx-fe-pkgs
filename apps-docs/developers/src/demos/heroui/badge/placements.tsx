// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Avatar, Badge } from '@vezham/react-v3'

const AVATAR_URL =
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg'

export function BadgePlacements() {
  const placements = [
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ] as const

  return (
    <div className="flex items-center gap-8">
      {placements.map(placement => (
        <div key={placement} className="flex flex-col items-center gap-2">
          <Badge.Anchor>
            <Avatar>
              <Avatar.Image src={AVATAR_URL} />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Badge color="accent" placement={placement} size="sm" />
          </Badge.Anchor>
          <span className="text-muted text-xs">{placement}</span>
        </div>
      ))}
    </div>
  )
}
