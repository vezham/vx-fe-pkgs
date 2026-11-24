// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Rating } from '@vezham/react-pro-v3'

export function CustomColor() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs">Accent</span>
        <Rating
          aria-label="Rating accent"
          defaultValue={4}
          style={
            {
              '--rating-active-color': 'var(--color-accent)'
            } as React.CSSProperties
          }>
          <Rating.Item value={1} />
          <Rating.Item value={2} />
          <Rating.Item value={3} />
          <Rating.Item value={4} />
          <Rating.Item value={5} />
        </Rating>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs">Danger</span>
        <Rating
          aria-label="Rating danger"
          defaultValue={4}
          style={
            {
              '--rating-active-color': 'var(--color-danger)'
            } as React.CSSProperties
          }>
          <Rating.Item value={1} />
          <Rating.Item value={2} />
          <Rating.Item value={3} />
          <Rating.Item value={4} />
          <Rating.Item value={5} />
        </Rating>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs">Success</span>
        <Rating
          aria-label="Rating success"
          defaultValue={4}
          style={
            {
              '--rating-active-color': 'var(--color-success)'
            } as React.CSSProperties
          }>
          <Rating.Item value={1} />
          <Rating.Item value={2} />
          <Rating.Item value={3} />
          <Rating.Item value={4} />
          <Rating.Item value={5} />
        </Rating>
      </div>
    </div>
  )
}
