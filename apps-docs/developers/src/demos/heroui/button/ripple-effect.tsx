// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Ripple } from 'm3-ripple'
import 'm3-ripple/ripple.css'

import { Button } from '@vezham/react-v3'

export function RippleEffect() {
  return (
    <Button variant="secondary">
      <Ripple />
      Click me
    </Button>
  )
}
