// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ReactNode } from 'react'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { RadialChart } from '@vezham/react-pro-v3/radial-chart'
import { Card } from '@vezham/react-v3'

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

export function ProgressRing() {
  const goal = 10000
  const current = 7452
  const pct = ((current / goal) * 100).toFixed(0)
  const progressData = [
    { fill: 'var(--chart-3)', name: 'Steps', value: current }
  ]

  return (
    <Card className="w-[300px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Daily Steps</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-3">
        <div className="relative">
          <RadialChart
            barSize={12}
            data={progressData}
            height={200}
            innerRadius="86%"
            outerRadius="100%"
            width={200}>
            <RadialChart.AngleAxis
              angleAxisId={0}
              domain={[0, goal]}
              tick={false}
              type="number"
            />
            <RadialChart.Bar
              background
              angleAxisId={0}
              cornerRadius={12}
              dataKey="value"
            />
            <RadialChart.Tooltip
              content={
                <RadialTooltip
                  valueFormatter={v => Number(v).toLocaleString()}
                />
              }
            />
          </RadialChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-3xl font-bold">{pct}%</span>
            <span className="text-muted text-xs">
              {current.toLocaleString()} / {goal.toLocaleString()}
            </span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
