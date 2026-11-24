// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleDollar, PersonMagnifier, TagDollar } from '@gravity-ui/icons'

import { KPI } from '@vezham/react-pro-v3/kpi'

export function WithIcon() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
      <KPI>
        <KPI.Header>
          <KPI.Icon status="success">
            <PersonMagnifier />
          </KPI.Icon>
          <KPI.Title>Total Users</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value maximumFractionDigits={0} value={5400} />
          <KPI.Trend trend="up">+33%</KPI.Trend>
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="warning">
            <CircleDollar />
          </KPI.Icon>
          <KPI.Title>Total Sales</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency="USD"
            maximumFractionDigits={0}
            style="currency"
            value={15400}
          />
          <KPI.Trend trend="neutral">0.0%</KPI.Trend>
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="danger">
            <TagDollar />
          </KPI.Icon>
          <KPI.Title>Net Profit</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency="USD"
            maximumFractionDigits={0}
            style="currency"
            value={10400}
          />
          <KPI.Trend trend="down">-3.3%</KPI.Trend>
        </KPI.Content>
      </KPI>
    </div>
  )
}
