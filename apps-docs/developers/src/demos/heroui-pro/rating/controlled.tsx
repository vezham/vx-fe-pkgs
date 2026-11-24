// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Rating } from '@vezham/react-pro-v3'

export function Controlled() {
  const [value, setValue] = useState(3)

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating aria-label="Rating" value={value} onValueChange={setValue}>
        <Rating.Item value={1} />
        <Rating.Item value={2} />
        <Rating.Item value={3} />
        <Rating.Item value={4} />
        <Rating.Item value={5} />
      </Rating>
      <span className="text-muted text-sm">
        {value} {value === 1 ? 'star' : 'stars'}
      </span>
    </div>
  )
}
