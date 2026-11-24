// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { HoloCard } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <HoloCard>
      <HoloCard.Rotator>
        <HoloCard.Frame>
          <HoloCard.Surface>
            <HoloCard.Inset />
            <HoloCard.Pattern />
            <HoloCard.Content className="flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-white">Holo Card</span>
                <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">
                  Move your pointer
                </span>
              </div>
            </HoloCard.Content>
            <HoloCard.Shine />
          </HoloCard.Surface>
        </HoloCard.Frame>
      </HoloCard.Rotator>
    </HoloCard>
  )
}
