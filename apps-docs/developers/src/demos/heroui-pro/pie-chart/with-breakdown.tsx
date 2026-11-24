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

const planData = [
  { name: 'Enterprise', value: 340 },
  { name: 'Pro', value: 520 },
  { name: 'Starter', value: 280 }
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

export function WithBreakdown() {
  const total = planData.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card className="w-[460px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Users by Plan</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-row items-center gap-6">
        <div className="relative shrink-0">
          <PieChart height={180} width={180}>
            <PieChart.Pie
              cornerRadius={12}
              cx="50%"
              cy="50%"
              data={planData}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}>
              {planData.map((_, idx) => (
                <PieChart.Cell
                  key={idx}
                  fill={CHART_COLORS[idx % CHART_COLORS.length]}
                />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip content={<PieTooltip />} />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-xl font-bold">
              {total.toLocaleString()}
            </span>
            <span className="text-muted text-[10px]">Total</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {planData.map((entry, idx) => {
            const pct = ((entry.value / total) * 100).toFixed(1)

            return (
              <div key={entry.name} className="flex items-center gap-3">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                  }}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-foreground text-sm">{entry.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-semibold">
                      {entry.value}
                    </span>
                    <span className="text-muted text-xs">({pct}%)</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card.Content>
    </Card>
  )
}
