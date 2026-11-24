// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Rating } from '@vezham/react-pro-v3'

export function Sizes() {
  return (
    <div className="flex items-center gap-8">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-muted text-xs">{size}</span>
          <Rating aria-label={`Rating ${size}`} defaultValue={3} size={size}>
            <Rating.Item value={1} />
            <Rating.Item value={2} />
            <Rating.Item value={3} />
            <Rating.Item value={4} />
            <Rating.Item value={5} />
          </Rating>
        </div>
      ))}
    </div>
  )
}
