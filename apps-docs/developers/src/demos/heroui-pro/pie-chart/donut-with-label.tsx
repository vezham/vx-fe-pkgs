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

const storageData = [
  { name: 'Documents', value: 42 },
  { name: 'Media', value: 28 },
  { name: 'Apps', value: 18 },
  { name: 'Other', value: 12 }
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

export function DonutWithLabel() {
  const total = storageData.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card className="w-[360px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Storage Usage</Card.Title>
        <Card.Description className="text-muted text-xs">
          {total} GB of 128 GB used
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <div className="relative">
          <PieChart height={220} width={220}>
            <PieChart.Pie
              cornerRadius={12}
              cx="50%"
              cy="50%"
              data={storageData}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}>
              {storageData.map((_, idx) => (
                <PieChart.Cell
                  key={idx}
                  fill={CHART_COLORS[idx % CHART_COLORS.length]}
                />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip
              content={<PieTooltip valueFormatter={v => `${v} GB`} />}
            />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-2xl font-bold">{total}</span>
            <span className="text-muted text-xs">GB used</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {storageData.map((entry, idx) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                }}
              />
              <span className="text-muted text-xs">
                {entry.name} ({entry.value} GB)
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  )
}
