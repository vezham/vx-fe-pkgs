// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip, Widget } from '@vezham/react-pro-v3'
import { LineChart } from '@vezham/react-pro-v3/line-chart'

const trafficData = [
  { month: 'Jan', organic: 2000, paidAds: 1000 },
  { month: 'Feb', organic: 15000, paidAds: 10000 },
  { month: 'Mar', organic: 8000, paidAds: 12000 },
  { month: 'Apr', organic: 14000, paidAds: 14000 },
  { month: 'May', organic: 15000, paidAds: 8000 },
  { month: 'Jun', organic: 8000, paidAds: 9000 },
  { month: 'Jul', organic: 18000, paidAds: 12000 },
  { month: 'Aug', organic: 18000, paidAds: 10000 },
  { month: 'Sep', organic: 20000, paidAds: 5000 },
  { month: 'Oct', organic: 17000, paidAds: 12000 },
  { month: 'Nov', organic: 22000, paidAds: 18000 },
  { month: 'Dec', organic: 15000, paidAds: 9000 }
]

export function WithLineChart() {
  return (
    <Widget className="w-full max-w-[520px]">
      <Widget.Header>
        <Widget.Title>Traffic Sources</Widget.Title>
        <Widget.Legend>
          <Widget.LegendItem color="var(--chart-3)">Organic</Widget.LegendItem>
          <Widget.LegendItem color="var(--chart-1)">Paid Ads</Widget.LegendItem>
        </Widget.Legend>
      </Widget.Header>
      <Widget.Content>
        <LineChart data={trafficData} height={200}>
          <LineChart.Grid vertical={false} />
          <LineChart.XAxis dataKey="month" tickMargin={8} />
          <LineChart.YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
            }
            width={30}
          />
          <LineChart.Line
            dataKey="organic"
            dot={false}
            name="Organic"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="paidAds"
            dot={false}
            name="Paid Ads"
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
