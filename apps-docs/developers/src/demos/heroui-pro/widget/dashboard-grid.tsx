// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip, TrendChip, Widget } from '@vezham/react-pro-v3'
import { AreaChart } from '@vezham/react-pro-v3/area-chart'
import { BarChart } from '@vezham/react-pro-v3/bar-chart'
import { LineChart } from '@vezham/react-pro-v3/line-chart'

const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 4900 },
  { month: 'Apr', revenue: 7200 },
  { month: 'May', revenue: 6100 },
  { month: 'Jun', revenue: 8400 },
  { month: 'Jul', revenue: 7800 },
  { month: 'Aug', revenue: 9200 },
  { month: 'Sep', revenue: 8600 },
  { month: 'Oct', revenue: 10200 },
  { month: 'Nov', revenue: 9800 },
  { month: 'Dec', revenue: 11500 }
]

const trafficData = [
  { month: 'Jan', organic: 2000, paidAds: 1000 },
  { month: 'Feb', organic: 5000, paidAds: 3000 },
  { month: 'Mar', organic: 8000, paidAds: 5000 },
  { month: 'Apr', organic: 7000, paidAds: 6000 },
  { month: 'May', organic: 9500, paidAds: 4000 },
  { month: 'Jun', organic: 8000, paidAds: 5500 }
]

const salesData = [
  { month: 'Jan', sales: 18 },
  { month: 'Feb', sales: 32 },
  { month: 'Mar', sales: 28 },
  { month: 'Apr', sales: 45 },
  { month: 'May', sales: 38 },
  { month: 'Jun', sales: 52 },
  { month: 'Jul', sales: 42 },
  { month: 'Aug', sales: 55 },
  { month: 'Sep', sales: 48 },
  { month: 'Oct', sales: 60 },
  { month: 'Nov', sales: 53 },
  { month: 'Dec', sales: 58 }
]

export function DashboardGrid() {
  return (
    <div className="grid w-full max-w-[960px] grid-cols-1 gap-3 md:grid-cols-2">
      {/* KPI row spanning full width */}
      <Widget className="md:col-span-2">
        <Widget.Header>
          <Widget.Title>Overview</Widget.Title>
        </Widget.Header>
        <Widget.Content className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              change: '12.5%',
              title: 'Revenue',
              trend: 'up' as const,
              value: '$228K'
            },
            {
              change: '8.2%',
              title: 'Orders',
              trend: 'up' as const,
              value: '1,234'
            },
            {
              change: '3.1%',
              title: 'Customers',
              trend: 'up' as const,
              value: '8,921'
            },
            {
              change: '0.4%',
              title: 'Conversion',
              trend: 'down' as const,
              value: '3.2%'
            }
          ].map(item => (
            <div key={item.title} className="flex flex-col gap-1">
              <span className="text-muted text-xs">{item.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-foreground text-xl font-semibold">
                  {item.value}
                </span>
                <TrendChip trend={item.trend} variant="soft">
                  {item.change}
                </TrendChip>
              </div>
            </div>
          ))}
        </Widget.Content>
      </Widget>

      {/* Area chart */}
      <Widget>
        <Widget.Header>
          <Widget.Title>Revenue</Widget.Title>
          <TrendChip trend="up" variant="tertiary">
            12.5%
          </TrendChip>
        </Widget.Header>
        <Widget.Content>
          <AreaChart data={revenueData} height={180}>
            <defs>
              <linearGradient id="dash-revenue" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <AreaChart.Grid vertical={false} />
            <AreaChart.XAxis dataKey="month" tickMargin={8} />
            <AreaChart.YAxis
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              width={40}
            />
            <AreaChart.Area
              dataKey="revenue"
              dot={false}
              fill="url(#dash-revenue)"
              stroke="var(--chart-3)"
              strokeWidth={2}
              type="monotone"
            />
            <AreaChart.Tooltip content={<AreaChart.TooltipContent />} />
          </AreaChart>
        </Widget.Content>
      </Widget>

      {/* Line chart */}
      <Widget>
        <Widget.Header>
          <Widget.Title>Traffic</Widget.Title>
          <Widget.Legend>
            <Widget.LegendItem color="var(--chart-3)">
              Organic
            </Widget.LegendItem>
            <Widget.LegendItem color="var(--chart-1)">Paid</Widget.LegendItem>
          </Widget.Legend>
        </Widget.Header>
        <Widget.Content>
          <LineChart data={trafficData} height={180}>
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
              name="Paid"
              stroke="var(--chart-1)"
              strokeWidth={2}
              type="monotone"
            />
            <LineChart.Tooltip content={<LineChart.TooltipContent />} />
          </LineChart>
        </Widget.Content>
      </Widget>

      {/* Bar chart spanning full width */}
      <Widget className="md:col-span-2">
        <Widget.Header>
          <Widget.Title>Monthly Sales</Widget.Title>
          <Widget.Description>Units sold — Jan to Dec 2025</Widget.Description>
        </Widget.Header>
        <Widget.Content>
          <BarChart data={salesData} height={180}>
            <BarChart.Grid vertical={false} />
            <BarChart.XAxis dataKey="month" tickMargin={8} />
            <BarChart.YAxis width={30} />
            <BarChart.Bar
              barSize={20}
              dataKey="sales"
              fill="var(--accent)"
              radius={[24, 24, 24, 24]}
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
                        <ChartTooltip.Label>Sales</ChartTooltip.Label>
                        <ChartTooltip.Value>
                          {entry.value} units
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
    </div>
  )
}
