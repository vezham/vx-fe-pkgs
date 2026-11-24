// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip, Widget } from '@vezham/react-pro-v3'
import { LineChart } from '@vezham/react-pro-v3/line-chart'

const tokensData = [
  { date: '2025-09-01', input: 35000, output: 22000 },
  { date: '2025-09-02', input: 80000, output: 35000 },
  { date: '2025-09-03', input: 130000, output: 48000 },
  { date: '2025-09-04', input: 140000, output: 50000 },
  { date: '2025-09-05', input: 15000, output: 5000 },
  { date: '2025-09-06', input: 50000, output: 30000 },
  { date: '2025-09-07', input: 65000, output: 35000 },
  { date: '2025-09-08', input: 70000, output: 40000 },
  { date: '2025-09-09', input: 60000, output: 45000 },
  { date: '2025-09-10', input: 40000, output: 15000 },
  { date: '2025-09-11', input: 55000, output: 28000 },
  { date: '2025-09-12', input: 75000, output: 35000 },
  { date: '2025-09-13', input: 50000, output: 30000 },
  { date: '2025-09-14', input: 45000, output: 25000 },
  { date: '2025-09-15', input: 90000, output: 40000 },
  { date: '2025-09-16', input: 95000, output: 45000 },
  { date: '2025-09-17', input: 110000, output: 48000 },
  { date: '2025-09-18', input: 60000, output: 30000 },
  { date: '2025-09-19', input: 55000, output: 25000 },
  { date: '2025-09-20', input: 70000, output: 20000 },
  { date: '2025-09-21', input: 60000, output: 22000 },
  { date: '2025-09-22', input: 55000, output: 18000 },
  { date: '2025-09-23', input: 65000, output: 25000 },
  { date: '2025-09-24', input: 50000, output: 15000 },
  { date: '2025-09-25', input: 45000, output: 18000 },
  { date: '2025-09-26', input: 55000, output: 20000 },
  { date: '2025-09-27', input: 40000, output: 15000 },
  { date: '2025-09-28', input: 35000, output: 12000 },
  { date: '2025-09-29', input: 30000, output: 10000 },
  { date: '2025-09-30', input: 28000, output: 8000 }
]

export function Default() {
  return (
    <Widget className="w-full max-w-[520px]">
      <Widget.Header>
        <Widget.Title>Tokens Over Time</Widget.Title>
        <Widget.Legend>
          <Widget.LegendItem color="var(--chart-4)">Input</Widget.LegendItem>
          <Widget.LegendItem color="var(--chart-1)">Output</Widget.LegendItem>
        </Widget.Legend>
      </Widget.Header>
      <Widget.Content>
        <LineChart data={tokensData} height={220}>
          <LineChart.Grid vertical={false} />
          <LineChart.XAxis
            dataKey="date"
            tickMargin={8}
            tickFormatter={(v: string) => {
              const d = new Date(v)

              return d.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit'
              })
            }}
          />
          <LineChart.YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
            }
            width={40}
          />
          <LineChart.Line
            dataKey="input"
            dot={false}
            name="Input"
            stroke="var(--chart-4)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="output"
            dot={false}
            name="Output"
            stroke="var(--chart-1)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Tooltip
            content={({ active, label, payload }) => {
              if (!active || !payload?.length) return null

              return (
                <ChartTooltip>
                  <ChartTooltip.Header>{label}</ChartTooltip.Header>
                  {payload.map(entry => (
                    <ChartTooltip.Item key={String(entry.dataKey)}>
                      <ChartTooltip.Indicator
                        color={entry.color ?? entry.stroke}
                      />
                      <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                      <ChartTooltip.Value>
                        {Number(entry.value).toLocaleString()}
                      </ChartTooltip.Value>
                    </ChartTooltip.Item>
                  ))}
                </ChartTooltip>
              )
            }}
          />
        </LineChart>
      </Widget.Content>
    </Widget>
  )
}
