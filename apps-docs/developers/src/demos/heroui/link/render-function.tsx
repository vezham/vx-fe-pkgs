// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Link } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <Link href="#" render={props => <span {...props} data-custom="foo" />}>
      Call to action
      <Link.Icon />
    </Link>
  )
}
