// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Rating } from '@vezham/react-pro-v3'

export function ProductReview() {
  return (
    <div className="flex w-[300px] flex-col gap-4">
      {[
        { name: 'Quality', rating: 4.5 },
        { name: 'Value for money', rating: 3.7 },
        { name: 'Design', rating: 5 },
        { name: 'Durability', rating: 2.3 }
      ].map(item => (
        <div key={item.name} className="flex items-center justify-between">
          <span className="text-foreground text-sm">{item.name}</span>
          <div className="flex items-center gap-2">
            <Rating
              isReadOnly
              aria-label={`${item.name}: ${item.rating} stars`}
              size="sm"
              value={item.rating}>
              <Rating.Item value={1} />
              <Rating.Item value={2} />
              <Rating.Item value={3} />
              <Rating.Item value={4} />
              <Rating.Item value={5} />
            </Rating>
            <span className="text-muted w-7 text-right text-xs">
              {item.rating}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
