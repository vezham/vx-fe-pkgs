// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Button } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <Button
      render={(props, { isPressed }) => (
        <button {...props} data-custom={isPressed ? 'pressed' : 'bar'} />
      )}>
      Press me
    </Button>
  )
}
