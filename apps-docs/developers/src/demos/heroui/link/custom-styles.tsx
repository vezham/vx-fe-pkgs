// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Link } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Link
      className="font-medium text-neutral-700 underline decoration-neutral-300/80 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:decoration-neutral-600/80 dark:hover:text-neutral-100"
      href="#">
      Call to action
      <Link.Icon />
    </Link>
  )
}
