// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { LineChart } from '@vezham/react-pro-v3/line-chart'
import { Card } from '@vezham/react-v3'

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

export function Default() {
  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Traffic Source</Card.Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            <span className="text-muted text-xs">Organic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-1)' }}
            />
            <span className="text-muted text-xs">Paid Ads</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-foreground text-lg font-semibold">231,856</span>
          <span className="text-muted text-xs">Sessions</span>
        </div>
        <LineChart data={trafficData} height={180}>
          <LineChart.Grid vertical={false} />
          <LineChart.XAxis dataKey="month" tickMargin={8} />
          <LineChart.YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
            }
            ticks={[0, 5000, 10000, 20000]}
            width={30}
          />
          <LineChart.Line
            dataKey="organic"
            dot={false}
            name="Organic"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="linear"
          />
          <LineChart.Line
            dataKey="paidAds"
            dot={false}
            name="Paid Ads"
            stroke="var(--chart-1)"
            strokeWidth={2}
            type="linear"
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
      </Card.Content>
    </Card>
  )
}
