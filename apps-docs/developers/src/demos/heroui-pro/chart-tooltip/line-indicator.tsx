// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function LineIndicator() {
  return (
    <ChartTooltip indicator="line">
      <ChartTooltip.Header>March 2025</ChartTooltip.Header>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color="var(--chart-3)" />
        <ChartTooltip.Label>Organic</ChartTooltip.Label>
        <ChartTooltip.Value>15,200</ChartTooltip.Value>
      </ChartTooltip.Item>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color="var(--chart-2)" />
        <ChartTooltip.Label>Paid Ads</ChartTooltip.Label>
        <ChartTooltip.Value>8,400</ChartTooltip.Value>
      </ChartTooltip.Item>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color="var(--chart-1)" />
        <ChartTooltip.Label>Referral</ChartTooltip.Label>
        <ChartTooltip.Value>3,100</ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}
