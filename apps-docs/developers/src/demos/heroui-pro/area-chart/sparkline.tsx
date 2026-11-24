// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { AreaChart } from '@vezham/react-pro-v3/area-chart'

const sparklineUp = [
  { value: 30 },
  { value: 35 },
  { value: 28 },
  { value: 42 },
  { value: 38 },
  { value: 45 },
  { value: 50 },
  { value: 48 },
  { value: 55 },
  { value: 60 },
  { value: 58 },
  { value: 65 }
]

const sparklineDown = [
  { value: 65 },
  { value: 60 },
  { value: 62 },
  { value: 55 },
  { value: 58 },
  { value: 52 },
  { value: 50 },
  { value: 48 },
  { value: 45 },
  { value: 42 },
  { value: 44 },
  { value: 40 }
]

export function Sparkline() {
  return (
    <div className="flex w-full items-center gap-6">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-muted text-xs">Revenue</span>
        <div>
          <AreaChart
            data={sparklineUp}
            height={48}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
            <defs>
              <linearGradient id="spark-up" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-success)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-success)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <AreaChart.Area
              dataKey="value"
              dot={false}
              fill="url(#spark-up)"
              stroke="var(--color-success)"
              strokeWidth={1.5}
              type="monotone"
            />
          </AreaChart>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-muted text-xs">Churn</span>
        <div>
          <AreaChart
            data={sparklineDown}
            height={48}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
            <defs>
              <linearGradient id="spark-down" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-danger)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-danger)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <AreaChart.Area
              dataKey="value"
              dot={false}
              fill="url(#spark-down)"
              stroke="var(--color-danger)"
              strokeWidth={1.5}
              type="monotone"
            />
          </AreaChart>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-muted text-xs">Users</span>
        <div>
          <AreaChart
            data={sparklineUp}
            height={48}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
            <defs>
              <linearGradient id="spark-accent" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <AreaChart.Area
              dataKey="value"
              dot={false}
              fill="url(#spark-accent)"
              stroke="var(--chart-3)"
              strokeWidth={1.5}
              type="monotone"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  )
}
