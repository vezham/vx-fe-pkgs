// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'

export function PrefixAndSuffix() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl p-6">
      <TrendChip trend="up">
        <TrendChip.Prefix>+$</TrendChip.Prefix>
        1,234
      </TrendChip>

      <TrendChip trend="down">
        -5.9%
        <TrendChip.Suffix>vs last month</TrendChip.Suffix>
      </TrendChip>

      <TrendChip trend="up">
        <TrendChip.Prefix>+</TrendChip.Prefix>
        3.3%
        <TrendChip.Suffix>MoM</TrendChip.Suffix>
      </TrendChip>
    </div>
  )
}
