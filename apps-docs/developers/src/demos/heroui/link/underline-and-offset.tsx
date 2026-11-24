// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Link } from '@vezham/react-v3'

export function LinkUnderlineAndOffset() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">
          Default hover underline
        </p>
        <Link href="#">
          Hover to see the underline
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">
          Always visible underline
        </p>
        <Link className="underline" href="#">
          Underline always visible
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">No underline</p>
        <Link className="no-underline" href="#">
          Link without any underline
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">
          Changing the underline offset
        </p>
        <div className="flex flex-col gap-3">
          <Link className="underline-offset-1" href="#">
            Offset 1 (1px space)
            <Link.Icon />
          </Link>
          <Link className="underline-offset-2" href="#">
            Offset 2 (2px space)
            <Link.Icon />
          </Link>
          <Link className="underline-offset-3" href="#">
            Offset 3 (3px space)
            <Link.Icon />
          </Link>
          <Link className="underline-offset-4" href="#">
            Offset 4 (4px space)
            <Link.Icon />
          </Link>
        </div>
      </div>
    </div>
  )
}
