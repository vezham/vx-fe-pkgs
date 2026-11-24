// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Button } from '@vezham/react-v3'

export function Basic() {
  return <Button onPress={() => console.log('Button pressed')}>Click me</Button>
}
