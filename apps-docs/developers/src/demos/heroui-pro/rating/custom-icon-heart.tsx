// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import HeartFill from '@gravity-ui/icons/HeartFill'

import { Rating } from '@vezham/react-pro-v3'

export function CustomIconHeart() {
  return (
    <Rating aria-label="Favorites" defaultValue={3} icon={<HeartFill />}>
      <Rating.Item value={1} />
      <Rating.Item value={2} />
      <Rating.Item value={3} />
      <Rating.Item value={4} />
      <Rating.Item value={5} />
    </Rating>
  )
}
