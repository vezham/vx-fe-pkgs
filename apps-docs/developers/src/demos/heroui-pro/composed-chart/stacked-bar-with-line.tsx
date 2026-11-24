// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ComposedChart } from '@vezham/react-pro-v3/composed-chart'
import { Card } from '@vezham/react-v3'

const data = [
  {
    aiPct: 72,
    cli: 800,
    cloudAgent: 200,
    day: 'Mar 13',
    ide: 2200,
    other: 100
  },
  { aiPct: 65, cli: 500, cloudAgent: 100, day: 'Mar 14', ide: 1200, other: 80 },
  { aiPct: 78, cli: 400, cloudAgent: 150, day: 'Mar 15', ide: 3200, other: 50 },
  {
    aiPct: 88,
    cli: 1200,
    cloudAgent: 300,
    day: 'Mar 16',
    ide: 13500,
    other: 200
  },
  {
    aiPct: 85,
    cli: 1000,
    cloudAgent: 250,
    day: 'Mar 17',
    ide: 13200,
    other: 180
  },
  { aiPct: 60, cli: 200, cloudAgent: 50, day: 'Mar 18', ide: 800, other: 30 },
  { aiPct: 55, cli: 150, cloudAgent: 40, day: 'Mar 19', ide: 600, other: 20 },
  { aiPct: 50, cli: 100, cloudAgent: 30, day: 'Mar 22', ide: 400, other: 15 },
  { aiPct: 48, cli: 80, cloudAgent: 20, day: 'Mar 25', ide: 300, other: 10 },
  {
    aiPct: 70,
    cli: 600,
    cloudAgent: 200,
    day: 'Mar 28',
    ide: 5000,
    other: 100
  },
  {
    aiPct: 75,
    cli: 800,
    cloudAgent: 250,
    day: 'Mar 31',
    ide: 8500,
    other: 150
  },
  { aiPct: 68, cli: 500, cloudAgent: 150, day: 'Apr 3', ide: 3000, other: 80 },
  {
    aiPct: 82,
    cli: 900,
    cloudAgent: 300,
    day: 'Apr 6',
    ide: 10500,
    other: 200
  },
  {
    aiPct: 90,
    cli: 1500,
    cloudAgent: 500,
    day: 'Apr 7',
    ide: 23000,
    other: 300
  },
  {
    aiPct: 85,
    cli: 1200,
    cloudAgent: 400,
    day: 'Apr 9',
    ide: 18000,
    other: 250
  }
]

export function StackedBarWithLine() {
  return (
    <Card className="w-full max-w-[700px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">
          AI Share of Committed Code
        </Card.Title>
        <div className="flex items-center gap-3">
          {[
            { color: 'var(--chart-4)', label: 'IDE' },
            { color: 'var(--chart-2)', label: 'CLI' },
            { color: 'var(--chart-3)', label: 'Cloud Agent' },
            { color: 'var(--chart-1)', label: 'Other' },
            { color: 'var(--muted)', label: 'AI %' }
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
        <ComposedChart data={data} height={300}>
          <ComposedChart.Grid vertical={false} />
          <ComposedChart.XAxis dataKey="day" tickMargin={8} />
          <ComposedChart.YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`
            }
            width={35}
            yAxisId="left"
          />
          <ComposedChart.YAxis
            domain={[0, 100]}
            orientation="right"
            tickFormatter={(v: number) => `${v}%`}
            width={40}
            yAxisId="right"
          />
          <ComposedChart.Bar
            barSize={20}
            dataKey="ide"
            fill="var(--chart-4)"
            name="IDE"
            stackId="code"
            yAxisId="left"
          />
          <ComposedChart.Bar
            dataKey="cli"
            fill="var(--chart-2)"
            name="CLI"
            stackId="code"
            yAxisId="left"
          />
          <ComposedChart.Bar
            dataKey="cloudAgent"
            fill="var(--chart-3)"
            name="Cloud Agent"
            stackId="code"
            yAxisId="left"
          />
          <ComposedChart.Bar
            dataKey="other"
            fill="var(--chart-1)"
            name="Other"
            radius={[4, 4, 0, 0]}
            stackId="code"
            yAxisId="left"
          />
          <ComposedChart.Line
            dataKey="aiPct"
            dot={false}
            name="AI %"
            stroke="var(--muted)"
            strokeWidth={1.5}
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
