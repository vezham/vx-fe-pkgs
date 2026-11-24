// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { AreaChart } from '@vezham/react-pro-v3/area-chart'
import { Card } from '@vezham/react-v3'

const stackedData = [
  { direct: 800, month: 'Jan', organic: 2000, paidAds: 1000, referral: 500 },
  { direct: 1500, month: 'Feb', organic: 5000, paidAds: 3000, referral: 1200 },
  { direct: 2200, month: 'Mar', organic: 8000, paidAds: 5000, referral: 2100 },
  { direct: 1800, month: 'Apr', organic: 7000, paidAds: 6000, referral: 2800 },
  { direct: 2600, month: 'May', organic: 9500, paidAds: 4000, referral: 3200 },
  { direct: 2000, month: 'Jun', organic: 8000, paidAds: 5500, referral: 2600 },
  { direct: 3100, month: 'Jul', organic: 12000, paidAds: 7000, referral: 4100 },
  { direct: 2800, month: 'Aug', organic: 11000, paidAds: 6500, referral: 3800 },
  { direct: 3500, month: 'Sep', organic: 14000, paidAds: 8000, referral: 4500 },
  { direct: 3200, month: 'Oct', organic: 13000, paidAds: 9000, referral: 5200 },
  {
    direct: 4000,
    month: 'Nov',
    organic: 16000,
    paidAds: 10000,
    referral: 5800
  },
  { direct: 3700, month: 'Dec', organic: 15000, paidAds: 9500, referral: 5100 }
]

export function Stacked() {
  return (
    <Card className="w-full max-w-[600px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Traffic Breakdown</Card.Title>
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
        <AreaChart data={stackedData} height={240}>
          <defs>
            <linearGradient id="stacked-organic" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.4} />
              <stop
                offset="100%"
                stopColor="var(--chart-4)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="stacked-paid" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.4} />
              <stop
                offset="100%"
                stopColor="var(--chart-3)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="stacked-referral" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
              <stop
                offset="100%"
                stopColor="var(--chart-2)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="stacked-direct" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
              <stop
                offset="100%"
                stopColor="var(--chart-1)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <AreaChart.Grid vertical={false} />
          <AreaChart.XAxis dataKey="month" tickMargin={8} />
          <AreaChart.YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
            }
            width={30}
          />
          <AreaChart.Area
            dataKey="organic"
            dot={false}
            fill="url(#stacked-organic)"
            name="Organic"
            stackId="traffic"
            stroke="var(--chart-4)"
            strokeWidth={2}
            type="monotone"
          />
          <AreaChart.Area
            dataKey="paidAds"
            dot={false}
            fill="url(#stacked-paid)"
            name="Paid Ads"
            stackId="traffic"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
          <AreaChart.Area
            dataKey="referral"
            dot={false}
            fill="url(#stacked-referral)"
            name="Referral"
            stackId="traffic"
            stroke="var(--chart-2)"
            strokeWidth={2}
            type="monotone"
          />
          <AreaChart.Area
            dataKey="direct"
            dot={false}
            fill="url(#stacked-direct)"
            name="Direct"
            stackId="traffic"
            stroke="var(--chart-1)"
            strokeWidth={2}
            type="monotone"
          />
          <AreaChart.Tooltip
            content={<AreaChart.TooltipContent indicator="line" />}
          />
        </AreaChart>
      </Card.Content>
    </Card>
  )
}
