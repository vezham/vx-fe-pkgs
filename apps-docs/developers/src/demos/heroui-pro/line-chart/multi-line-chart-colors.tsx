// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { LineChart } from '@vezham/react-pro-v3/line-chart'
import { Card } from '@vezham/react-v3'

const data = [
  {
    directTraffic: 800,
    month: 'Jan',
    organic: 2000,
    paidAds: 1000,
    referral: 500
  },
  {
    directTraffic: 1500,
    month: 'Feb',
    organic: 5000,
    paidAds: 3000,
    referral: 1200
  },
  {
    directTraffic: 2200,
    month: 'Mar',
    organic: 8000,
    paidAds: 5000,
    referral: 2100
  },
  {
    directTraffic: 1800,
    month: 'Apr',
    organic: 7000,
    paidAds: 6000,
    referral: 2800
  },
  {
    directTraffic: 2600,
    month: 'May',
    organic: 9500,
    paidAds: 4000,
    referral: 3200
  },
  {
    directTraffic: 2000,
    month: 'Jun',
    organic: 8000,
    paidAds: 5500,
    referral: 2600
  },
  {
    directTraffic: 3100,
    month: 'Jul',
    organic: 12000,
    paidAds: 7000,
    referral: 4100
  },
  {
    directTraffic: 2800,
    month: 'Aug',
    organic: 11000,
    paidAds: 6500,
    referral: 3800
  },
  {
    directTraffic: 3500,
    month: 'Sep',
    organic: 14000,
    paidAds: 8000,
    referral: 4500
  },
  {
    directTraffic: 3200,
    month: 'Oct',
    organic: 13000,
    paidAds: 9000,
    referral: 5200
  },
  {
    directTraffic: 4000,
    month: 'Nov',
    organic: 16000,
    paidAds: 10000,
    referral: 5800
  },
  {
    directTraffic: 3700,
    month: 'Dec',
    organic: 15000,
    paidAds: 9500,
    referral: 5100
  }
]

export function MultiLineChartColors() {
  return (
    <Card className="w-[600px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Traffic Sources</Card.Title>
        <div className="flex items-center gap-3">
          {[
            { color: 'var(--chart-4)', label: 'Organic' },
            { color: 'var(--chart-3)', label: 'Paid Ads' },
            { color: 'var(--chart-2)', label: 'Referral' },
            { color: 'var(--chart-1)', label: 'Direct' }
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </Card.Header>
      <Card.Content>
        <LineChart data={data} height={240}>
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
            stroke="var(--chart-4)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="paidAds"
            dot={false}
            name="Paid Ads"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="referral"
            dot={false}
            name="Referral"
            stroke="var(--chart-2)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="directTraffic"
            dot={false}
            name="Direct"
            stroke="var(--chart-1)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Tooltip
            content={<LineChart.TooltipContent indicator="line" />}
          />
        </LineChart>
      </Card.Content>
    </Card>
  )
}
