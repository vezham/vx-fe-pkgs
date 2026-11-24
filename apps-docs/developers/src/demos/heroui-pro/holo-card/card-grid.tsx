// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CSSProperties } from 'react'

import { HoloCard } from '@vezham/react-pro-v3'

/** Trading-card proportions (2.5 × 3.5in), small enough to fit a search-results grid. */
const TRADING_CARD = {
  '--holo-card-bleed': '14px',
  '--holo-card-height': '210px',
  '--holo-card-radius': '10px',
  '--holo-card-width': '150px'
} as CSSProperties

const CARDS = Array.from({ length: 16 }, (_, index) => ({
  alt: `Collectible card ${index + 1}`,
  src: `https://img.heroui.chat/image/game?w=300&h=420&u=${index + 1}`
}))

export function CardGrid() {
  return (
    <div className="flex flex-wrap justify-center">
      {CARDS.map(({ alt, src }) => (
        <HoloCard key={src} style={TRADING_CARD}>
          <HoloCard.Rotator>
            <HoloCard.Frame>
              <HoloCard.Surface>
                <HoloCard.Image alt={alt} loading="lazy" src={src} />
                <HoloCard.Shine />
              </HoloCard.Surface>
            </HoloCard.Frame>
          </HoloCard.Rotator>
        </HoloCard>
      ))}
    </div>
  )
}
