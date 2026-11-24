// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CSSProperties } from 'react'

import { HoloCard } from '@vezham/react-pro-v3'

/**
 * The holographic texture is just a `background-image`, so any CSS value works.
 * Point `--holo-card-pattern` at a `url(...)` (or use the `patternSrc` prop) to
 * use a texture file instead.
 */
const PATTERNS = [
  {
    label: 'Lattice',
    style: {
      '--holo-card-pattern':
        'repeating-conic-gradient(from 45deg, rgb(255 255 255 / 0.9) 0% 25%, rgb(0 0 0 / 0.6) 25% 50%)',
      '--holo-card-pattern-size': '24px 24px'
    }
  },
  {
    label: 'Brushed',
    style: {
      '--holo-card-pattern':
        'repeating-linear-gradient(100deg, rgb(255 255 255 / 0.75) 0px, rgb(120 120 120 / 0.3) 2px, rgb(0 0 0 / 0.7) 4px)',
      '--holo-card-pattern-size': 'auto'
    }
  }
]

const compact = {
  '--holo-card-bleed': '22px',
  '--holo-card-height': '320px',
  '--holo-card-radius': '18px',
  '--holo-card-width': '215px'
}

export function WithPattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {PATTERNS.map(({ label, style }) => (
        <HoloCard key={label} style={{ ...compact, ...style } as CSSProperties}>
          <HoloCard.Rotator>
            <HoloCard.Frame>
              <HoloCard.Surface>
                <HoloCard.Inset />
                <HoloCard.Pattern />
                <HoloCard.Content className="items-end justify-center pb-8">
                  <span className="text-[10px] font-medium tracking-widest text-white/50 uppercase">
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
