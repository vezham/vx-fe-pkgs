// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="flex items-center gap-3 rounded-2xl p-6">
      <TrendChip trend="up">+3.3%</TrendChip>
      <TrendChip trend="down">-2.1%</TrendChip>
      <TrendChip trend="neutral">0.0%</TrendChip>
    </div>
  )
}
