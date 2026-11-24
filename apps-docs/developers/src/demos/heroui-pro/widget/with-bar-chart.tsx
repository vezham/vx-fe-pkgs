// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip, Widget } from '@vezham/react-pro-v3'
import { BarChart } from '@vezham/react-pro-v3/bar-chart'

const requestsData = [
  { date: '2025-09-01', requests: 680 },
  { date: '2025-09-02', requests: 1150 },
  { date: '2025-09-03', requests: 1470 },
  { date: '2025-09-04', requests: 1130 },
  { date: '2025-09-05', requests: 560 },
  { date: '2025-09-06', requests: 470 },
  { date: '2025-09-07', requests: 960 },
  { date: '2025-09-08', requests: 1200 },
  { date: '2025-09-09', requests: 1120 },
  { date: '2025-09-10', requests: 1060 },
  { date: '2025-09-11', requests: 780 },
  { date: '2025-09-12', requests: 930 },
  { date: '2025-09-13', requests: 950 },
  { date: '2025-09-14', requests: 1050 },
  { date: '2025-09-15', requests: 1740 },
  { date: '2025-09-16', requests: 940 },
  { date: '2025-09-17', requests: 1570 },
  { date: '2025-09-18', requests: 1250 },
  { date: '2025-09-19', requests: 930 },
  { date: '2025-09-20', requests: 1280 },
  { date: '2025-09-21', requests: 1180 },
  { date: '2025-09-22', requests: 1320 },
  { date: '2025-09-23', requests: 950 },
  { date: '2025-09-24', requests: 980 },
  { date: '2025-09-25', requests: 680 },
  { date: '2025-09-26', requests: 510 },
  { date: '2025-09-27', requests: 960 },
  { date: '2025-09-28', requests: 860 },
  { date: '2025-09-29', requests: 630 },
  { date: '2025-09-30', requests: 380 }
]

export function WithBarChart() {
  return (
    <Widget className="w-full max-w-[520px]">
      <Widget.Header>
        <Widget.Title>Requests Over Time</Widget.Title>
        <Widget.Legend>
          <Widget.LegendItem color="var(--chart-3)">Requests</Widget.LegendItem>
        </Widget.Legend>
      </Widget.Header>
      <Widget.Content>
        <BarChart data={requestsData} height={220}>
          <BarChart.Grid vertical={false} />
          <BarChart.XAxis
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
          <BarChart.YAxis width={40} />
          <BarChart.Bar
            dataKey="requests"
            fill="var(--chart-3)"
            radius={[2, 2, 0, 0]}
          />
          <BarChart.Tooltip
            content={({ active, label, payload }) => {
              if (!active || !payload?.length) return null

              return (
                <ChartTooltip>
                  <ChartTooltip.Header>{label}</ChartTooltip.Header>
                  {payload.map(entry => (
                    <ChartTooltip.Item key={String(entry.dataKey)}>
                      <ChartTooltip.Indicator
                        color={entry.color ?? entry.fill}
                      />
                      <ChartTooltip.Label>Requests</ChartTooltip.Label>
                      <ChartTooltip.Value>
                        {Number(entry.value).toLocaleString()}
                      </ChartTooltip.Value>
                    </ChartTooltip.Item>
                  ))}
                </ChartTooltip>
              )
            }}
          />
        </BarChart>
      </Widget.Content>
    </Widget>
  )
}
