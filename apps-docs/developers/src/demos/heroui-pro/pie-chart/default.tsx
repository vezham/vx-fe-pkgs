// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ReactNode } from 'react'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { PieChart } from '@vezham/react-pro-v3/pie-chart'
import { Card } from '@vezham/react-v3'

const CHART_COLORS = [
  'var(--chart-4)',
  'var(--chart-3)',
  'var(--chart-2)',
  'var(--chart-1)'
]

const browserData = [
  { name: 'Chrome', value: 62 },
  { name: 'Safari', value: 19 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 9 }
]

function PieTooltip({
  active,
  payload
}: {
  active?: boolean
  payload?: Array<{
    name?: string
    payload?: { fill?: string }
    value?: number | string
  }>
  valueFormatter?: (value: number | string) => ReactNode
}) {
  const entry = payload?.[0]

  if (!active || !entry) return null

  return (
    <ChartTooltip>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color={entry.payload?.fill} />
        <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
        <ChartTooltip.Value>{entry.value}</ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}

export function Default() {
  return (
    <Card className="w-[360px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Browser Usage</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <PieChart height={220}>
          <PieChart.Pie
            cx="50%"
            cy="50%"
            data={browserData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}>
            {browserData.map((_, idx) => (
              <PieChart.Cell
                key={idx}
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
              />
            ))}
          </PieChart.Pie>
          <PieChart.Tooltip content={<PieTooltip />} />
        </PieChart>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {browserData.map((entry, idx) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                }}
              />
              <span className="text-muted text-xs">{entry.name}</span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  )
}
