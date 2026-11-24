// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CSSProperties } from 'react'

import { HoloCard } from '@vezham/react-pro-v3'

/** Trading-card proportions (2.5 × 3.5in), scaled down to fit three across. */
const TRADING_CARD = {
  '--holo-card-bleed': '24px',
  '--holo-card-height': '294px',
  '--holo-card-radius': '14px',
  '--holo-card-width': '210px'
} as CSSProperties

const CARDS = [
  {
    alt: 'Neon-lit game controller',
    src: 'https://img.heroui.chat/image/game?w=420&h=588&u=3'
  },
  {
    alt: 'Collectible mascot figure',
    src: 'https://img.heroui.chat/image/game?w=420&h=588&u=6'
  },
  {
    alt: 'Backlit gaming headset',
    src: 'https://img.heroui.chat/image/game?w=420&h=588&u=8'
  }
]

export function ImageGallery() {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {CARDS.map(({ alt, src }) => (
        <HoloCard key={src} style={TRADING_CARD}>
          <HoloCard.Rotator>
            <HoloCard.Frame>
              <HoloCard.Surface>
                <HoloCard.Image alt={alt} src={src} />
                <HoloCard.Pattern />
                <HoloCard.Shine />
              </HoloCard.Surface>
            </HoloCard.Frame>
          </HoloCard.Rotator>
        </HoloCard>
      ))}
    </div>
  )
}
