// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Rating } from '@vezham/react-pro-v3'

export function Disabled() {
  return (
    <Rating isDisabled aria-label="Rating" defaultValue={3}>
      <Rating.Item value={1} />
      <Rating.Item value={2} />
      <Rating.Item value={3} />
      <Rating.Item value={4} />
      <Rating.Item value={5} />
    </Rating>
  )
}
