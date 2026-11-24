// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ComposedChart } from '@vezham/react-pro-v3/composed-chart'
import { Card } from '@vezham/react-v3'

const data = [
  { month: 'Jan', sessions: 12000, target: 15000 },
  { month: 'Feb', sessions: 18000, target: 16000 },
  { month: 'Mar', sessions: 15000, target: 17000 },
  { month: 'Apr', sessions: 22000, target: 18000 },
  { month: 'May', sessions: 19000, target: 19000 },
  { month: 'Jun', sessions: 25000, target: 20000 },
  { month: 'Jul', sessions: 23000, target: 21000 },
  { month: 'Aug', sessions: 28000, target: 22000 },
  { month: 'Sep', sessions: 26000, target: 23000 },
  { month: 'Oct', sessions: 31000, target: 24000 },
  { month: 'Nov', sessions: 29000, target: 25000 },
  { month: 'Dec', sessions: 34000, target: 26000 }
]

export function AreaWithLine() {
  return (
    <Card className="w-full max-w-[560px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Sessions vs Target</Card.Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            <span className="text-muted text-xs">Sessions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-1)' }}
            />
            <span className="text-muted text-xs">Target</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <ComposedChart data={data} height={260}>
          <defs>
            <linearGradient id="sessions-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.2} />
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
          />
          <ComposedChart.Area
            dataKey="sessions"
            dot={false}
            fill="url(#sessions-gradient)"
            name="Sessions"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
          <ComposedChart.Line
            dataKey="target"
            dot={false}
            name="Target"
            stroke="var(--chart-1)"
            strokeDasharray="6 3"
            strokeWidth={2}
            type="monotone"
          />
          <ComposedChart.Tooltip content={<ComposedChart.TooltipContent />} />
        </ComposedChart>
      </Card.Content>
    </Card>
  )
}
