// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { RadialChart } from '@vezham/react-pro-v3/radial-chart'
import { Card } from '@vezham/react-v3'

interface RadialTooltipProps {
  payload?: Array<{
    name?: string
    payload?: Record<string, unknown>
    value?: number | string
  }>
}

function RadialTooltip({ payload }: RadialTooltipProps) {
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

export function GaugeGrid() {
  const metrics = [
    { color: 'var(--chart-4)', label: 'Conversion', max: 1000, value: 750 },
    { color: 'var(--chart-3)', label: 'Engagement', max: 4200, value: 3150 },
    { color: 'var(--chart-2)', label: 'Bounce Rate', max: 100, value: 35 },
    { color: 'var(--color-danger)', label: 'Errors', max: 500, value: 450 }
  ]

  return (
    <div className="grid w-[640px] grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map(metric => {
        const gaugeData = [
          { fill: metric.color, name: metric.label, value: metric.value }
        ]
        const pct = ((metric.value / metric.max) * 100).toFixed(0)

        return (
          <Card key={metric.label} className="rounded-2xl">
            <Card.Header className="pb-0">
              <Card.Title className="text-muted text-xs font-medium">
                {metric.label}
              </Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col items-center">
              <div className="relative">
                <RadialChart
                  barSize={8}
                  data={gaugeData}
                  endAngle={-45}
                  height={120}
                  innerRadius="70%"
                  outerRadius="90%"
                  startAngle={225}
                  width={120}>
                  <RadialChart.AngleAxis
                    angleAxisId={0}
                    domain={[0, metric.max]}
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
                  <span className="text-foreground text-lg font-bold">
                    {pct}%
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        )
      })}
    </div>
  )
}
