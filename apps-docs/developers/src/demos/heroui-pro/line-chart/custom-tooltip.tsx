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

export function CustomTooltip() {
  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Sessions</Card.Title>
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
              style={{ backgroundColor: 'var(--chart-2)' }}
            />
            <span className="text-muted text-xs">Paid Ads</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
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
            stroke="var(--chart-2)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Tooltip
            content={({ active, label, payload }: any) => {
              if (!active || !payload?.length) return null

              const total = payload.reduce(
                (sum: number, entry: any) => sum + (entry.value ?? 0),
                0
              )

              return (
                <ChartTooltip indicator="line">
                  <ChartTooltip.Header>{label}</ChartTooltip.Header>
                  {payload.map((entry: any, idx: number) => (
                    <ChartTooltip.Item key={idx}>
                      <ChartTooltip.Indicator color={entry.stroke} />
                      <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                      <ChartTooltip.Value>
                        {Number(entry.value).toLocaleString()}
                      </ChartTooltip.Value>
                    </ChartTooltip.Item>
                  ))}
                  <div className="border-separator mt-1 flex items-center justify-between border-t pt-1.5">
                    <span className="text-muted text-xs font-medium">
                      Total
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {total.toLocaleString()}
                    </span>
                  </div>
                </ChartTooltip>
              )
            }}
          />
        </LineChart>
      </Card.Content>
    </Card>
  )
}
