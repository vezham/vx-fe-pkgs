// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Persons } from '@gravity-ui/icons'

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

export function WithChartBottom() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
      <KPI>
        <KPI.Header>
          <KPI.Title>Total Revenue</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency="USD"
            maximumFractionDigits={0}
            style="currency"
            value={228451}
          />
          <KPI.Trend trend="up">+3.3%</KPI.Trend>
        </KPI.Content>
        <KPI.Chart color="var(--color-success)" data={sparklineUp} />
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Title>Baer Limited (BAL)</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value currency="USD" style="currency" value={49.33} />
          <KPI.Trend trend="down">-1.9%</KPI.Trend>
        </KPI.Content>
        <KPI.Chart color="var(--color-danger)" data={sparklineDown} />
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="success">
            <Persons />
          </KPI.Icon>
          <KPI.Title>Active Users</KPI.Title>
        </KPI.Header>
        <KPI.Actions />
        <KPI.Content>
          <KPI.Value
            maximumFractionDigits={0}
            notation="compact"
            value={97859}
          />
          <KPI.Trend trend="neutral">10.9%</KPI.Trend>
        </KPI.Content>
        <KPI.Chart color="var(--color-accent)" data={sparklineUp} height={60} />
      </KPI>
    </div>
  )
}
