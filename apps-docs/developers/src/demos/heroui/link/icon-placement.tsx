// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Link } from '@vezham/react-v3'

export function LinkIconPlacement() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        Icon at end (default)
        <Link.Icon />
      </Link>
      <Link className="gap-1" href="#">
        <Link.Icon />
        Icon at start
      </Link>
    </div>
  )
}
