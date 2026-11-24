// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import ArrowDown from '@gravity-ui/icons/ArrowDown'
import ArrowUp from '@gravity-ui/icons/ArrowUp'
import Flame from '@gravity-ui/icons/Flame'
import Thunderbolt from '@gravity-ui/icons/Thunderbolt'

import { TrendChip } from '@vezham/react-pro-v3'

export function CustomIndicator() {
  return (
    <div className="flex items-center gap-3 rounded-2xl p-6">
      <TrendChip trend="up">
        <TrendChip.Indicator>
          <ArrowUp />
        </TrendChip.Indicator>
        +3.3%
      </TrendChip>

      <TrendChip trend="down">
        <TrendChip.Indicator>
          <ArrowDown />
        </TrendChip.Indicator>
        -2.1%
      </TrendChip>

      <TrendChip trend="up">
        <TrendChip.Indicator>
          <Flame />
        </TrendChip.Indicator>
        +12.5%
      </TrendChip>

      <TrendChip trend="neutral">
        <TrendChip.Indicator>
          <Thunderbolt />
        </TrendChip.Indicator>
        0.0%
      </TrendChip>
    </div>
  )
}
