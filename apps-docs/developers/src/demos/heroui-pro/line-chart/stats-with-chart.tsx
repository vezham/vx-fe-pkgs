// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ArrowDown, ArrowUp } from '@gravity-ui/icons'

import { LineChart } from '@vezham/react-pro-v3/line-chart'
import { Card, Chip } from '@vezham/react-v3'

const monthlyRevenue = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 4900 },
  { month: 'Apr', revenue: 7200 },
  { month: 'May', revenue: 6100 },
  { month: 'Jun', revenue: 8400 },
  { month: 'Jul', revenue: 7800 },
  { month: 'Aug', revenue: 9200 },
  { month: 'Sep', revenue: 8600 },
  { month: 'Oct', revenue: 10200 },
  { month: 'Nov', revenue: 9800 },
  { month: 'Dec', revenue: 11500 }
]

export function StatsWithChart() {
  const stats = [
    {
      label: 'Revenue',
      trend: 'up' as const,
      trendValue: '3.3%',
      value: '$228,441'
    },
    {
      label: 'Expenses',
      trend: 'down' as const,
      trendValue: '3.3%',
      value: '$25,108'
    },
    { label: 'Sales', trend: 'up' as const, trendValue: '3.3%', value: '458' }
  ]

  return (
    <div className="flex w-[700px] flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {stats.map(stat => (
          <Card key={stat.label} className="gap-1 rounded-2xl">
            <Card.Header>
              <Card.Description className="text-sm font-medium">
                {stat.label}
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-row items-center gap-2">
              <span className="text-foreground flex-1 text-2xl font-semibold">
                {stat.value}
              </span>
              <Chip
                color={stat.trend === 'up' ? 'success' : 'danger'}
                size="sm"
                variant="soft">
                {stat.trend === 'up' ? (
                  <ArrowUp className="size-3" />
                ) : (
                  <ArrowDown className="size-3" />
                )}
                {stat.trendValue}
              </Chip>
            </Card.Content>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="text-base">Monthly Revenue</Card.Title>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: 'var(--chart-3)' }}
              />
              <span className="text-muted text-xs">Revenue</span>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <LineChart data={monthlyRevenue} height={200}>
            <LineChart.Grid vertical={false} />
            <LineChart.XAxis dataKey="month" tickMargin={8} />
            <LineChart.YAxis
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              width={40}
            />
            <LineChart.Line
              dataKey="revenue"
              dot={false}
              name="Revenue"
              stroke="var(--chart-3)"
              strokeWidth={2}
              type="monotone"
            />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  valueFormatter={v => `${Number(v).toLocaleString()}`}
                />
              }
            />
          </LineChart>
        </Card.Content>
      </Card>
    </div>
  )
}
