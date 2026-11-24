// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { LineChart } from '@vezham/react-pro-v3/line-chart'

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
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs">Revenue</span>
        <div className="w-[120px]">
          <LineChart
            data={sparklineUp}
            height={40}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke="var(--color-success)"
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs">Churn</span>
        <div className="w-[120px]">
          <LineChart
            data={sparklineDown}
            height={40}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke="var(--color-danger)"
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs">Users</span>
        <div className="w-[120px]">
          <LineChart
            data={sparklineUp}
            height={40}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke="var(--chart-3)"
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </div>
      </div>
    </div>
  )
}
