// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import HeartFill from '@gravity-ui/icons/HeartFill'

import { Rating } from '@vezham/react-pro-v3'

export function CustomIconPerItem() {
  return (
    <Rating
      aria-label="Favorites"
      defaultValue={3}
      style={
        {
          '--rating-active-color': 'var(--color-danger)'
        } as React.CSSProperties
      }>
      <Rating.Item value={1}>
        <HeartFill />
      </Rating.Item>
      <Rating.Item value={2}>
        <HeartFill />
      </Rating.Item>
      <Rating.Item value={3}>
        <HeartFill />
      </Rating.Item>
      <Rating.Item value={4}>
        <HeartFill />
      </Rating.Item>
      <Rating.Item value={5}>
        <HeartFill />
      </Rating.Item>
    </Rating>
  )
}
