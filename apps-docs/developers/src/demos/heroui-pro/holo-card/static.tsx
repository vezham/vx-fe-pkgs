// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CSSProperties } from 'react'

import { HoloCard } from '@vezham/react-pro-v3'

const compact = {
  '--holo-card-bleed': '20px',
  '--holo-card-height': '300px',
  '--holo-card-radius': '16px',
  '--holo-card-width': '200px'
} as CSSProperties

export function Static() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {[
        { isInteractive: true, label: 'Interactive' },
        { isInteractive: false, label: 'Static' }
      ].map(({ isInteractive, label }) => (
        <HoloCard key={label} isInteractive={isInteractive} style={compact}>
          <HoloCard.Rotator>
            <HoloCard.Frame>
              <HoloCard.Surface>
                <HoloCard.Inset />
                <HoloCard.Content className="items-center justify-center">
                  <span className="text-lg font-semibold text-white">
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
