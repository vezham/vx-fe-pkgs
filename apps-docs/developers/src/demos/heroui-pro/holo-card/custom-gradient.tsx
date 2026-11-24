// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CSSProperties } from 'react'

import { HoloCard } from '@vezham/react-pro-v3'

const CARDS = [
  {
    gradient:
      'linear-gradient(140deg, rgb(14, 165, 233) 0%, rgb(9, 125, 188) 30%, rgb(6, 85, 138) 66%, rgb(4, 48, 95) 100%)',
    label: 'Ocean'
  },
  {
    gradient:
      'linear-gradient(140deg, rgb(139, 92, 246) 0%, rgb(108, 68, 208) 30%, rgb(78, 46, 162) 66%, rgb(50, 28, 118) 100%)',
    label: 'Violet'
  },
  {
    gradient:
      'linear-gradient(140deg, rgb(16, 185, 129) 0%, rgb(12, 140, 100) 30%, rgb(9, 98, 72) 66%, rgb(5, 60, 46) 100%)',
    label: 'Emerald'
  }
]

/** Shrunk down so all three fit side by side. */
const compact = {
  '--holo-card-bleed': '20px',
  '--holo-card-height': '260px',
  '--holo-card-radius': '16px',
  '--holo-card-width': '180px'
} as CSSProperties

export function CustomGradient() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {CARDS.map(({ gradient, label }) => (
        <HoloCard key={label} gradient={gradient} style={compact}>
          <HoloCard.Rotator>
            <HoloCard.Frame>
              <HoloCard.Surface>
                <HoloCard.Inset />
                <HoloCard.Content className="items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {label}
                  </span>
                </HoloCard.Content>
                <HoloCard.Shine />
              </HoloCard.Surface>
            </HoloCard.Frame>
          </HoloCard.Rotator>
        </HoloCard>
      ))}
    </div>
  )
}
