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

const trafficData = [
  { name: 'Organic', value: 4500 },
  { name: 'Direct', value: 3200 },
  { name: 'Referral', value: 2100 },
  { name: 'Social', value: 1400 }
]

function PieTooltip({
  active,
  payload,
  valueFormatter
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
        <ChartTooltip.Value>
          {valueFormatter ? valueFormatter(entry.value ?? '') : entry.value}
        </ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}

export function Donut() {
  return (
    <Card className="w-[360px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Traffic Sources</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <PieChart height={220}>
          <PieChart.Pie
            cornerRadius={12}
            cx="50%"
            cy="50%"
            data={trafficData}
            dataKey="value"
            innerRadius="68%"
            nameKey="name"
            paddingAngle={-20}
            strokeWidth={0}>
            {trafficData.map((_, idx) => (
              <PieChart.Cell
                key={idx}
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
              />
            ))}
          </PieChart.Pie>
          <PieChart.Tooltip
            content={
              <PieTooltip valueFormatter={v => Number(v).toLocaleString()} />
            }
          />
        </PieChart>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {trafficData.map((entry, idx) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                }}
              />
              <span className="text-muted text-xs">
                {entry.name} ({entry.value.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  )
}
