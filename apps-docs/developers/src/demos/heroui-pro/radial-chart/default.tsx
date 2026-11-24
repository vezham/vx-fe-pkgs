// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ReactNode } from 'react'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { RadialChart } from '@vezham/react-pro-v3/radial-chart'
import { Card } from '@vezham/react-v3'

const energyData = [
  {
    fill: 'var(--chart-4)',
    name: 'Calories',
    value: 200,
    valueText: '1,623/2,000 kcal'
  },
  {
    fill: 'var(--chart-3)',
    name: 'Steps',
    value: 350,
    valueText: '8,328/10,000 steps'
  },
  {
    fill: 'var(--chart-2)',
    name: 'Exercise',
    value: 250,
    valueText: '25/120 min'
  }
]

function RadialTooltip({
  payload,
  valueFormatter
}: {
  active?: boolean
  payload?: Array<{
    name?: string
    payload?: Record<string, unknown>
    value?: number | string
  }>
  valueFormatter?: (value: number | string) => ReactNode
}) {
  const entry = payload?.[0]

  if (!entry?.payload) return null

  const name = (entry.payload['name'] as string) ?? entry.name
  const value = (entry.payload['value'] as number) ?? entry.value
  const fill = entry.payload['fill'] as string

  return (
    <ChartTooltip>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color={fill} />
        <ChartTooltip.Label>{name}</ChartTooltip.Label>
        <ChartTooltip.Value>
          {valueFormatter && value != null ? valueFormatter(value) : value}
        </ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}

export function Default() {
  return (
    <Card className="w-[380px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Energy Activity</Card.Title>
      </Card.Header>
      <Card.Content className="flex items-center gap-4">
        <div className="flex flex-1 flex-col gap-2 self-start">
          {energyData.map(item => (
            <div key={item.name} className="flex flex-col">
              <span className="text-muted text-xs">{item.name}</span>
              <span className="text-foreground text-sm font-semibold">
                {item.valueText}
              </span>
            </div>
          ))}
        </div>
        <div className="relative shrink-0">
          <RadialChart
            data={energyData}
            height={200}
            innerRadius="40%"
            outerRadius="100%"
            width={200}>
            <RadialChart.Bar background cornerRadius={12} dataKey="value" />
            <RadialChart.Tooltip content={<RadialTooltip />} />
          </RadialChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-muted text-[10px]">Calories</span>
            <span className="text-foreground text-sm font-semibold">
              700 kcal
            </span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
