// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Rating } from '@vezham/react-pro-v3'
import { Label } from '@vezham/react-v3'

export function WithLabel() {
  const [value, setValue] = useState(0)

  return (
    <div className="flex flex-col gap-1.5">
      <Label>How would you rate this product?</Label>
      <Rating
        aria-label="Product rating"
        value={value}
        onValueChange={setValue}>
        <Rating.Item value={1} />
        <Rating.Item value={2} />
        <Rating.Item value={3} />
        <Rating.Item value={4} />
        <Rating.Item value={5} />
      </Rating>
      {value > 0 && (
        <span className="text-muted text-xs">
          You selected {value} {value === 1 ? 'star' : 'stars'}
        </span>
      )}
    </div>
  )
}
