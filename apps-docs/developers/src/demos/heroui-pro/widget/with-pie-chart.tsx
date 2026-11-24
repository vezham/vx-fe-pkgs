// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip, Widget } from '@vezham/react-pro-v3'
import { PieChart } from '@vezham/react-pro-v3/pie-chart'

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

export function WithPieChart() {
  return (
    <Widget className="w-full max-w-[360px]">
      <Widget.Header>
        <Widget.Title>Browser Usage</Widget.Title>
      </Widget.Header>
      <Widget.Content className="flex flex-col items-center gap-4">
        <PieChart height={200}>
          <PieChart.Pie
            cx="50%"
            cy="50%"
            data={browserData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}>
            {browserData.map((_, idx) => (
              <PieChart.Cell
                key={idx}
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
              />
            ))}
          </PieChart.Pie>
          <PieChart.Tooltip
            content={({ active, payload }) => {
              const entry = payload?.[0]

              if (!active || !entry) return null

              return (
                <ChartTooltip>
                  <ChartTooltip.Item>
                    <ChartTooltip.Indicator color={entry.payload?.fill} />
                    <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                    <ChartTooltip.Value>{entry.value}%</ChartTooltip.Value>
                  </ChartTooltip.Item>
                </ChartTooltip>
              )
            }}
          />
        </PieChart>
        <Widget.Legend className="flex-wrap justify-center">
          {browserData.map((entry, idx) => (
            <Widget.LegendItem
              key={entry.name}
              color={CHART_COLORS[idx % CHART_COLORS.length]!}>
              {entry.name}
            </Widget.LegendItem>
          ))}
        </Widget.Legend>
      </Widget.Content>
    </Widget>
  )
}
