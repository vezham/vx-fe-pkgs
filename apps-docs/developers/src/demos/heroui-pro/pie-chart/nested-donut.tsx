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

const innerData = [
  { name: 'Q1', value: 3200 },
  { name: 'Q2', value: 4100 },
  { name: 'Q3', value: 3800 },
  { name: 'Q4', value: 5200 }
]

const outerData = [
  { name: 'Q1', value: 4800 },
  { name: 'Q2', value: 5600 },
  { name: 'Q3', value: 5100 },
  { name: 'Q4', value: 6800 }
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

export function NestedDonut() {
  return (
    <Card className="w-[400px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">
          Revenue: This Year vs Last
        </Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <PieChart height={240}>
          <PieChart.Pie
            cornerRadius={12}
            cx="50%"
            cy="50%"
            data={innerData}
            dataKey="value"
            innerRadius="34%"
            nameKey="name"
            outerRadius="46%"
            paddingAngle={-20}
            strokeWidth={0}>
            {innerData.map((_, idx) => (
              <PieChart.Cell
                key={idx}
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
              />
            ))}
          </PieChart.Pie>
          <PieChart.Pie
            cornerRadius={12}
            cx="50%"
            cy="50%"
            data={outerData}
            dataKey="value"
            innerRadius="56%"
            nameKey="name"
            outerRadius="68%"
            paddingAngle={-20}
            strokeWidth={0}>
            {outerData.map((_, idx) => (
              <PieChart.Cell
                key={idx}
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
              />
            ))}
          </PieChart.Pie>
          <PieChart.Tooltip
            content={
              <PieTooltip
                valueFormatter={v => `${Number(v).toLocaleString()}`}
              />
            }
          />
        </PieChart>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => (
              <div key={q} className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[idx] }}
                />
                <span className="text-muted text-xs">{q}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="bg-muted/30 size-2.5 rounded-full" />
            <span>Last year (inner)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-muted size-2.5 rounded-full" />
            <span>This year (outer)</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
