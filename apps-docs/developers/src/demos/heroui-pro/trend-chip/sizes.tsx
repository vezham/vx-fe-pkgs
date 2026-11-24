// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'

export function Sizes() {
  return (
    <div className="flex items-center gap-3 rounded-2xl p-6">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <TrendChip key={size} size={size} trend="up">
          +3.3%
        </TrendChip>
      ))}
    </div>
  )
}
