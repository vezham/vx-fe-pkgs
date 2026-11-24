// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ComposedChart } from '@vezham/react-pro-v3/composed-chart'
import { Card } from '@vezham/react-v3'

const data = [
  { bounceRate: 42, month: 'Jan', pageViews: 8200, users: 3200 },
  { bounceRate: 38, month: 'Feb', pageViews: 11500, users: 4500 },
  { bounceRate: 40, month: 'Mar', pageViews: 9800, users: 3800 },
  { bounceRate: 35, month: 'Apr', pageViews: 14200, users: 5600 },
  { bounceRate: 37, month: 'May', pageViews: 12100, users: 4800 },
  { bounceRate: 32, month: 'Jun', pageViews: 16800, users: 6600 },
  { bounceRate: 34, month: 'Jul', pageViews: 15200, users: 6000 },
  { bounceRate: 30, month: 'Aug', pageViews: 18400, users: 7200 },
  { bounceRate: 31, month: 'Sep', pageViews: 17200, users: 6800 },
  { bounceRate: 28, month: 'Oct', pageViews: 20500, users: 8100 },
  { bounceRate: 29, month: 'Nov', pageViews: 19600, users: 7700 },
  { bounceRate: 26, month: 'Dec', pageViews: 23000, users: 9100 }
]

export function MultiType() {
  return (
    <Card className="w-full max-w-[620px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Site Analytics</Card.Title>
        <div className="flex items-center gap-3">
          {[
            { color: 'var(--chart-3)', label: 'Page Views' },
            { color: 'var(--chart-4)', label: 'Users' },
            { color: 'var(--chart-1)', label: 'Bounce Rate' }
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </Card.Header>
      <Card.Content>
        <ComposedChart data={data} height={280}>
          <defs>
            <linearGradient id="pv-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.15} />
              <stop
                offset="100%"
                stopColor="var(--chart-3)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <ComposedChart.Grid vertical={false} />
          <ComposedChart.XAxis dataKey="month" tickMargin={8} />
          <ComposedChart.YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
            }
            width={30}
            yAxisId="left"
          />
          <ComposedChart.YAxis
            domain={[0, 60]}
            orientation="right"
            tickFormatter={(v: number) => `${v}%`}
            width={35}
            yAxisId="right"
          />
          <ComposedChart.Area
            dataKey="pageViews"
            dot={false}
            fill="url(#pv-gradient)"
            name="Page Views"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
            yAxisId="left"
          />
          <ComposedChart.Bar
            barSize={14}
            dataKey="users"
            fill="var(--chart-4)"
            name="Users"
            radius={[4, 4, 0, 0]}
            yAxisId="left"
          />
          <ComposedChart.Line
            dataKey="bounceRate"
            dot={{ fill: 'var(--chart-1)', r: 3, strokeWidth: 0 }}
            name="Bounce Rate"
            stroke="var(--chart-1)"
            strokeWidth={2}
            type="monotone"
            yAxisId="right"
          />
          <ComposedChart.Tooltip
            content={<ComposedChart.TooltipContent indicator="line" />}
          />
        </ComposedChart>
      </Card.Content>
    </Card>
  )
}
