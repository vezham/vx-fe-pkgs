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

const deviceData = [
  { name: 'Mobile', value: 2800 },
  { name: 'Desktop', value: 1200 },
  { name: 'Tablet', value: 500 }
]

interface PieTooltipProps {
  active?: boolean
  payload?: Array<{
    name?: string
    payload?: { fill?: string }
    value?: number | string
  }>
  valueFormatter?: (value: number | string) => ReactNode
}

function PieTooltip({ active, payload, valueFormatter }: PieTooltipProps) {
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

export function DonutWithContent() {
  const total = deviceData.reduce((sum, d) => sum + d.value, 0)
  const formatted =
    total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total.toString()

  return (
    <Card className="w-[360px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Connected Devices</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <div className="relative">
          <PieChart height={240} width={240}>
            <PieChart.Pie
              cornerRadius={12}
              cx="50%"
              cy="50%"
              data={deviceData}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}>
              {deviceData.map((_, idx) => (
                <PieChart.Cell
                  key={idx}
                  fill={CHART_COLORS[idx % CHART_COLORS.length]}
                />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip content={<PieTooltip />} />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-3xl font-bold">
              {formatted}
            </span>
            <span className="text-muted text-sm">Devices</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {deviceData.map((entry, idx) => {
            const pct = ((entry.value / total) * 100).toFixed(0)

            return (
              <div key={entry.name} className="flex items-center gap-3">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                  }}
                />
                <span className="text-foreground w-16 text-sm">
                  {entry.name}
                </span>
                <span className="text-foreground text-sm font-semibold">
                  {entry.value.toLocaleString()}
                </span>
                <span className="text-muted text-xs">({pct}%)</span>
              </div>
            )
          })}
        </div>
      </Card.Content>
    </Card>
  )
}
