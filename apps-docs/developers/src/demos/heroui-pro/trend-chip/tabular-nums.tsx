// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'

export function TabularNums() {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl p-6">
      <TrendChip trend="up">+1.1%</TrendChip>
      <TrendChip trend="up">+22.2%</TrendChip>
      <TrendChip trend="down">-333.3%</TrendChip>
      <TrendChip trend="neutral">0.0%</TrendChip>
    </div>
  )
}
