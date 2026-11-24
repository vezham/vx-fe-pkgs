// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function NoHeader() {
  return (
    <ChartTooltip>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color="var(--chart-3)" />
        <ChartTooltip.Label>Sales</ChartTooltip.Label>
        <ChartTooltip.Value>458</ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}
