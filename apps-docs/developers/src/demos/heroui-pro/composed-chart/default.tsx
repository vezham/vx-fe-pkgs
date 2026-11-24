// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { ComposedChart } from '@vezham/react-pro-v3/composed-chart'
import { Card } from '@vezham/react-v3'

const data = [
  { month: 'Jan', orders: 320, revenue: 4200 },
  { month: 'Feb', orders: 450, revenue: 5800 },
  { month: 'Mar', orders: 380, revenue: 4900 },
  { month: 'Apr', orders: 520, revenue: 7200 },
  { month: 'May', orders: 480, revenue: 6100 },
  { month: 'Jun', orders: 600, revenue: 8400 },
  { month: 'Jul', orders: 550, revenue: 7800 },
  { month: 'Aug', orders: 680, revenue: 9200 },
  { month: 'Sep', orders: 620, revenue: 8600 },
  { month: 'Oct', orders: 750, revenue: 10200 },
  { month: 'Nov', orders: 700, revenue: 9800 },
  { month: 'Dec', orders: 820, revenue: 11500 }
]

export function Default() {
  return (
    <Card className="w-full rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Revenue & Orders</Card.Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            <span className="text-muted text-xs">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-1)' }}
            />
            <span className="text-muted text-xs">Orders</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <ComposedChart data={data} height={260}>
          <ComposedChart.Grid vertical={false} />
          <ComposedChart.XAxis dataKey="month" tickMargin={8} />
          <ComposedChart.YAxis
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            width={40}
            yAxisId="left"
          />
          <ComposedChart.YAxis orientation="right" width={40} yAxisId="right" />
          <ComposedChart.Bar
            barSize={16}
            dataKey="revenue"
            fill="var(--chart-3)"
            name="Revenue"
            radius={[4, 4, 0, 0]}
            yAxisId="left"
          />
          <ComposedChart.Line
            dataKey="orders"
            dot={false}
            name="Orders"
            stroke="var(--chart-1)"
            strokeWidth={2}
            type="monotone"
            yAxisId="right"
          />
          <ComposedChart.Tooltip
            content={({ active, label, payload }) => {
              if (!active || !payload?.length) return null

              return (
                <ChartTooltip>
                  <ChartTooltip.Header>{label}</ChartTooltip.Header>
                  {payload.map(entry => {
                    const isRevenue = entry.dataKey === 'revenue'

                    return (
                      <ChartTooltip.Item key={String(entry.dataKey)}>
                        <ChartTooltip.Indicator
                          color={entry.color ?? entry.fill ?? entry.stroke}
                        />
                        <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                        <ChartTooltip.Value>
                          {isRevenue
                            ? `${Number(entry.value).toLocaleString()}`
                            : Number(entry.value).toLocaleString()}
                        </ChartTooltip.Value>
                      </ChartTooltip.Item>
                    )
                  })}
                </ChartTooltip>
              )
            }}
          />
        </ComposedChart>
      </Card.Content>
    </Card>
  )
}
