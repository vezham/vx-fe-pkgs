// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { LineChart } from '@vezham/react-pro-v3/line-chart'
import { Card } from '@vezham/react-v3'

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

export function WithDots() {
  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Monthly Revenue</Card.Title>
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
            activeDot={{ r: 5 }}
            dataKey="revenue"
            dot={{ fill: 'var(--chart-3)', r: 3, strokeWidth: 0 }}
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
  )
}
