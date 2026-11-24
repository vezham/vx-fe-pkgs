// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'
import { BarChart } from '@vezham/react-pro-v3/bar-chart'
import { KPI } from '@vezham/react-pro-v3/kpi'

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

export function KPIWithBarChart() {
  return (
    <KPI className="w-full max-w-[400px]">
      <KPI.Header>
        <KPI.Title>Monthly Sales</KPI.Title>
      </KPI.Header>
      <KPI.Content className="flex flex-col gap-3">
        <div className="flex gap-3 self-start">
          <KPI.Value
            className="text-3xl"
            maximumFractionDigits={0}
            value={278}
          />
          <TrendChip trend="up" variant="tertiary">
            3.3%
            <TrendChip.Suffix>last 30d</TrendChip.Suffix>
          </TrendChip>
        </div>
        <BarChart data={salesData} height={160}>
          <BarChart.Grid vertical={false} />
          <BarChart.XAxis dataKey="month" tickMargin={8} />
          <BarChart.Bar
            barSize={16}
            dataKey="sales"
            fill="var(--accent)"
            radius={[24, 24, 24, 24]}
          />
          <BarChart.Tooltip content={<BarChart.TooltipContent />} />
        </BarChart>
      </KPI.Content>
    </KPI>
  )
}
