// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { KPIGroup } from '@vezham/react-pro-v3'
import { KPI } from '@vezham/react-pro-v3/kpi'

export function Vertical() {
  return (
    <div className="flex w-[400px] items-center justify-center rounded-2xl p-6">
      <KPIGroup orientation="vertical">
        <KPI>
          <KPI.Header>
            <KPI.Title>Revenue</KPI.Title>
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
        </KPI>
        <KPIGroup.Separator />
        <KPI>
          <KPI.Header>
            <KPI.Title>Expenses</KPI.Title>
          </KPI.Header>
          <KPI.Content>
            <KPI.Value
              currency="USD"
              maximumFractionDigits={0}
              style="currency"
              value={25108}
            />
            <KPI.Trend trend="down">-3.3%</KPI.Trend>
          </KPI.Content>
        </KPI>
        <KPIGroup.Separator />
        <KPI>
          <KPI.Header>
            <KPI.Title>Profit</KPI.Title>
          </KPI.Header>
          <KPI.Content>
            <KPI.Value
              currency="USD"
              maximumFractionDigits={0}
              style="currency"
              value={203133}
            />
            <KPI.Trend trend="up">+4.1%</KPI.Trend>
          </KPI.Content>
        </KPI>
      </KPIGroup>
    </div>
  )
}
