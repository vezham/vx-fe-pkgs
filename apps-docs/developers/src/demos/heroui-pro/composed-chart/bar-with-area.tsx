// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ComposedChart } from '@vezham/react-pro-v3/composed-chart'
import { Card } from '@vezham/react-v3'

const data = [
  { ctr: 3.2, impressions: 45000, month: 'Jan' },
  { ctr: 3.8, impressions: 52000, month: 'Feb' },
  { ctr: 3.5, impressions: 48000, month: 'Mar' },
  { ctr: 4.2, impressions: 61000, month: 'Apr' },
  { ctr: 4.0, impressions: 58000, month: 'May' },
  { ctr: 4.8, impressions: 72000, month: 'Jun' },
  { ctr: 4.5, impressions: 68000, month: 'Jul' },
  { ctr: 5.1, impressions: 78000, month: 'Aug' },
  { ctr: 4.9, impressions: 75000, month: 'Sep' },
  { ctr: 5.5, impressions: 85000, month: 'Oct' },
  { ctr: 5.2, impressions: 82000, month: 'Nov' },
  { ctr: 5.8, impressions: 92000, month: 'Dec' }
]

export function BarWithArea() {
  return (
    <Card className="w-full max-w-[560px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Impressions & CTR</Card.Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            <span className="text-muted text-xs">Impressions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-4)' }}
            />
            <span className="text-muted text-xs">CTR %</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <ComposedChart data={data} height={260}>
          <defs>
            <linearGradient id="ctr-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.15} />
              <stop
                offset="100%"
                stopColor="var(--chart-4)"
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
            width={35}
            yAxisId="left"
          />
          <ComposedChart.YAxis
            domain={[0, 8]}
            orientation="right"
            tickFormatter={(v: number) => `${v}%`}
            width={35}
            yAxisId="right"
          />
          <ComposedChart.Area
            dataKey="ctr"
            dot={false}
            fill="url(#ctr-gradient)"
            name="CTR"
            stroke="none"
            type="monotone"
            yAxisId="right"
          />
          <ComposedChart.Bar
            barSize={16}
            dataKey="impressions"
            fill="var(--chart-3)"
            name="Impressions"
            radius={[4, 4, 0, 0]}
            yAxisId="left"
          />
          <ComposedChart.Line
            dataKey="ctr"
            dot={false}
            legendType="none"
            stroke="var(--chart-4)"
            strokeWidth={2}
            tooltipType="none"
            type="monotone"
            yAxisId="right"
          />
          <ComposedChart.Tooltip content={<ComposedChart.TooltipContent />} />
        </ComposedChart>
      </Card.Content>
    </Card>
  )
}
