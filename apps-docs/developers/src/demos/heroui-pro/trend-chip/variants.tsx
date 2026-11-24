// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'

export function Variants() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6">
      {(['primary', 'secondary', 'tertiary', 'soft'] as const).map(v => (
        <div key={v} className="flex items-center gap-3">
          <span className="text-muted w-20 text-xs">{v}</span>
          <TrendChip trend="up" variant={v}>
            +3.3%
          </TrendChip>
          <TrendChip trend="down" variant={v}>
            -2.1%
          </TrendChip>
          <TrendChip trend="neutral" variant={v}>
            0.0%
          </TrendChip>
        </div>
      ))}
    </div>
  )
}
