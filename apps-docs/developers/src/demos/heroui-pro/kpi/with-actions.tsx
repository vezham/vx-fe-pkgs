// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ShoppingCart,
  SquareChartBar,
  SquareDashedCircle
} from '@gravity-ui/icons'

import { NumberValue } from '@vezham/react-pro-v3'
import { KPI } from '@vezham/react-pro-v3/kpi'

export function WithActions() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
      <KPI>
        <KPI.Header>
          <KPI.Icon status="success">
            <ShoppingCart />
          </KPI.Icon>
          <KPI.Title>Conversion Rate</KPI.Title>
        </KPI.Header>
        <KPI.Actions />
        <KPI.Content>
          <KPI.Value maximumFractionDigits={1} style="percent" value={0.038} />
          <KPI.Trend trend="up">+1.7%</KPI.Trend>
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="danger">
            <SquareChartBar />
          </KPI.Icon>
          <KPI.Title>Bounce Rate</KPI.Title>
        </KPI.Header>
        <KPI.Actions />
        <KPI.Content>
          <KPI.Value maximumFractionDigits={1} style="percent" value={0.423} />
          <KPI.Trend trend="down">-5.9%</KPI.Trend>
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="warning">
            <SquareDashedCircle />
          </KPI.Icon>
          <KPI.Title>Load Time</KPI.Title>
        </KPI.Header>
        <KPI.Actions />
        <KPI.Content>
          <KPI.Value value={856}>
            <NumberValue.Suffix>ms</NumberValue.Suffix>
          </KPI.Value>
          <KPI.Progress status="warning" value={56} />
        </KPI.Content>
      </KPI>
    </div>
  )
}
