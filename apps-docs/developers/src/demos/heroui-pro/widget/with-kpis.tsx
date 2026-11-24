// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { KPIGroup, TrendChip, Widget } from '@vezham/react-pro-v3'
import { KPI } from '@vezham/react-pro-v3/kpi'

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

export function WithKPIs() {
  return (
    <Widget className="w-full max-w-[900px]">
      <Widget.Header>
        <Widget.Title>Key Metrics</Widget.Title>
        <Widget.Description>Last 30 days</Widget.Description>
      </Widget.Header>
      <Widget.Content>
        <KPIGroup className="bg-transparent shadow-none">
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
              <KPI.Chart
                color="var(--color-accent)"
                data={sparklineUp}
                height={60}
                strokeWidth={1.5}
              />
            </KPI.Content>
          </KPI>
          <KPIGroup.Separator />
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
              <KPI.Chart
                color="var(--color-danger)"
                data={sparklineDown}
                height={60}
                strokeWidth={1.5}
              />
            </KPI.Content>
          </KPI>
          <KPIGroup.Separator />
          <KPI>
            <KPI.Header>
              <KPI.Title>Active Users</KPI.Title>
            </KPI.Header>
            <KPI.Content className="grid-cols-[1fr_1fr] items-end">
              <div className="flex flex-col gap-1">
                <KPI.Value
                  className="text-3xl"
                  maximumFractionDigits={0}
                  notation="compact"
                  value={97859}
                />
                <TrendChip trend="up" variant="tertiary">
                  10.9%
                  <TrendChip.Suffix>this month</TrendChip.Suffix>
                </TrendChip>
              </div>
              <KPI.Chart
                color="var(--color-success)"
                data={sparklineUp}
                height={60}
                strokeWidth={1.5}
              />
            </KPI.Content>
          </KPI>
        </KPIGroup>
      </Widget.Content>
    </Widget>
  )
}
