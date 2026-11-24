// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <ChartTooltip>
      <ChartTooltip.Header>January</ChartTooltip.Header>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color="var(--chart-3)" />
        <ChartTooltip.Label>Revenue</ChartTooltip.Label>
        <ChartTooltip.Value>$12,400</ChartTooltip.Value>
      </ChartTooltip.Item>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color="var(--chart-1)" />
        <ChartTooltip.Label>Expenses</ChartTooltip.Label>
        <ChartTooltip.Value>$8,200</ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}
