// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ReactNode } from 'react'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { RadialChart } from '@vezham/react-pro-v3/radial-chart'
import { Card } from '@vezham/react-v3'

function RadialTooltip({
  payload
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
        <ChartTooltip.Value>{value}</ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  )
}

export function Gauge() {
  const total = 1358
  const current = 780
  const gaugeData = [
    { fill: 'var(--chart-3)', name: 'Active Users', value: current }
  ]

  return (
    <Card className="w-[280px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Activity</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center">
        <div className="relative">
          <RadialChart
            barSize={10}
            data={gaugeData}
            endAngle={-45}
            height={200}
            innerRadius="70%"
            outerRadius="90%"
            startAngle={225}
            width={200}>
            <RadialChart.AngleAxis
              angleAxisId={0}
              domain={[0, total]}
              tick={false}
              type="number"
            />
            <RadialChart.Bar
              background
              angleAxisId={0}
              cornerRadius={12}
              dataKey="value"
            />
            <RadialChart.Tooltip content={<RadialTooltip />} />
          </RadialChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-muted text-xs">Active Users</span>
            <span className="text-foreground text-xl font-bold">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
