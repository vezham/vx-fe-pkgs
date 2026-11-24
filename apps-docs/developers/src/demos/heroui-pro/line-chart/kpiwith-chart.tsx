// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrendChip } from '@vezham/react-pro-v3'
import { KPI } from '@vezham/react-pro-v3/kpi'
import { LineChart } from '@vezham/react-pro-v3/line-chart'

const sparklineUp = [
  { value: 30 },
  { value: 35 },
  { value: 28 },
  { value: 42 },
  { value: 38 },
  { value: 45 },
  { value: 50 },
  { value: 48 },
  { value: 55 },
  { value: 60 },
  { value: 58 },
  { value: 65 }
]

const sparklineDown = [
  { value: 65 },
  { value: 60 },
  { value: 62 },
  { value: 55 },
  { value: 58 },
  { value: 52 },
  { value: 50 },
  { value: 48 },
  { value: 45 },
  { value: 42 },
  { value: 44 },
  { value: 40 }
]

export function KPIWithChart() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <KPI>
        <KPI.Header>
          <KPI.Title>Total Revenue</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              currency="USD"
              maximumFractionDigits={0}
              style="currency"
              value={228451}
            />
            <TrendChip trend="up" variant="tertiary">
              3.3%
              <TrendChip.Suffix>last 30d</TrendChip.Suffix>
            </TrendChip>
          </div>
          <LineChart
            data={sparklineUp}
            height={70}
            margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke="var(--chart-3)"
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Title>Bounce Rate</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              maximumFractionDigits={1}
              style="percent"
              value={0.423}
            />
            <TrendChip trend="down" variant="tertiary">
              5.9%
              <TrendChip.Suffix>vs last 7d</TrendChip.Suffix>
            </TrendChip>
          </div>
          <LineChart
            data={sparklineDown}
            height={70}
            margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke="var(--color-danger)"
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Title>New Customers</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              maximumFractionDigits={0}
              value={1234}
            />
            <TrendChip trend="up" variant="tertiary">
              1.0%
              <TrendChip.Suffix>this week</TrendChip.Suffix>
            </TrendChip>
          </div>
          <LineChart
            data={sparklineUp}
            height={70}
            margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke="var(--color-success)"
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </KPI.Content>
      </KPI>
    </div>
  )
}
