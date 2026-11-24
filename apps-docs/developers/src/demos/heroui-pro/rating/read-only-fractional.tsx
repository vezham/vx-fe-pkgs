// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Rating } from '@vezham/react-pro-v3'

export function ReadOnlyFractional() {
  return (
    <div className="flex flex-col gap-4">
      {[1.5, 2.3, 3.7, 4.2, 4.8].map(val => (
        <div key={val} className="flex items-center gap-3">
          <Rating isReadOnly aria-label={`${val} out of 5 stars`} value={val}>
            <Rating.Item value={1} />
            <Rating.Item value={2} />
            <Rating.Item value={3} />
            <Rating.Item value={4} />
            <Rating.Item value={5} />
          </Rating>
          <span className="text-muted text-sm">{val}</span>
        </div>
      ))}
    </div>
  )
}
