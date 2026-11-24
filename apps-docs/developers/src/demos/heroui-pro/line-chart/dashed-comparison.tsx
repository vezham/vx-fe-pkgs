// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { LineChart } from '@vezham/react-pro-v3/line-chart'
import { Card } from '@vezham/react-v3'

const data = [
  { actual: 4200, month: 'Jan', target: 5000 },
  { actual: 5800, month: 'Feb', target: 5500 },
  { actual: 4900, month: 'Mar', target: 6000 },
  { actual: 7200, month: 'Apr', target: 6500 },
  { actual: 6100, month: 'May', target: 7000 },
  { actual: 8400, month: 'Jun', target: 7500 },
  { actual: 7800, month: 'Jul', target: 8000 },
  { actual: 9200, month: 'Aug', target: 8500 },
  { actual: 8600, month: 'Sep', target: 9000 },
  { actual: 10200, month: 'Oct', target: 9500 },
  { actual: 9800, month: 'Nov', target: 10000 },
  { actual: 11500, month: 'Dec', target: 10500 }
]

export function DashedComparison() {
  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Actual vs Target</Card.Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            <span className="text-muted text-xs">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="h-0 w-3 rounded-full border-t-2 border-dashed"
              style={{ borderColor: 'var(--chart-2)' }}
            />
            <span className="text-muted text-xs">Target</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <LineChart data={data} height={200}>
          <LineChart.Grid vertical={false} />
          <LineChart.XAxis dataKey="month" tickMargin={8} />
          <LineChart.YAxis
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            width={40}
          />
          <LineChart.Line
            dataKey="target"
            dot={false}
            name="Target"
            stroke="var(--chart-2)"
            strokeDasharray="5 5"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="actual"
            dot={false}
            name="Actual"
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
