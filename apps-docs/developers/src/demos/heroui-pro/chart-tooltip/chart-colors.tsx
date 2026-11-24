// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function ChartColors() {
  return (
    <div className="flex gap-6">
      <ChartTooltip>
        <ChartTooltip.Header>All Chart Colors</ChartTooltip.Header>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-1)" />
          <ChartTooltip.Label>chart-1</ChartTooltip.Label>
          <ChartTooltip.Value>Lightest</ChartTooltip.Value>
        </ChartTooltip.Item>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-2)" />
          <ChartTooltip.Label>chart-2</ChartTooltip.Label>
          <ChartTooltip.Value>Light</ChartTooltip.Value>
        </ChartTooltip.Item>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-3)" />
          <ChartTooltip.Label>chart-3</ChartTooltip.Label>
          <ChartTooltip.Value>Accent</ChartTooltip.Value>
        </ChartTooltip.Item>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-4)" />
          <ChartTooltip.Label>chart-4</ChartTooltip.Label>
          <ChartTooltip.Value>Darkest</ChartTooltip.Value>
        </ChartTooltip.Item>
      </ChartTooltip>

      <ChartTooltip indicator="line">
        <ChartTooltip.Header>Line Indicators</ChartTooltip.Header>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-1)" />
          <ChartTooltip.Label>chart-1</ChartTooltip.Label>
          <ChartTooltip.Value>Lightest</ChartTooltip.Value>
        </ChartTooltip.Item>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-2)" />
          <ChartTooltip.Label>chart-2</ChartTooltip.Label>
          <ChartTooltip.Value>Light</ChartTooltip.Value>
        </ChartTooltip.Item>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-3)" />
          <ChartTooltip.Label>chart-3</ChartTooltip.Label>
          <ChartTooltip.Value>Accent</ChartTooltip.Value>
        </ChartTooltip.Item>
        <ChartTooltip.Item>
          <ChartTooltip.Indicator color="var(--chart-4)" />
          <ChartTooltip.Label>chart-4</ChartTooltip.Label>
          <ChartTooltip.Value>Darkest</ChartTooltip.Value>
        </ChartTooltip.Item>
      </ChartTooltip>
    </div>
  )
}
