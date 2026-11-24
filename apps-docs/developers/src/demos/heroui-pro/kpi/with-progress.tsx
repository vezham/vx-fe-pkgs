// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { SquareChartBar, SquareDashedCircle } from '@gravity-ui/icons'

import { KPI } from '@vezham/react-pro-v3/kpi'

export function WithProgress() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
      <KPI>
        <KPI.Header>
          <KPI.Icon status="success">
            <SquareChartBar />
          </KPI.Icon>
          <KPI.Title>Server Load</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value maximumFractionDigits={0} style="percent" value={0.38} />
          <KPI.Progress status="success" value={38} />
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="danger">
            <SquareChartBar />
          </KPI.Icon>
          <KPI.Title>Server Load</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value maximumFractionDigits={0} style="percent" value={0.98} />
          <KPI.Progress status="danger" value={98} />
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="warning">
            <SquareDashedCircle />
          </KPI.Icon>
          <KPI.Title>Average Memory Used</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value maximumFractionDigits={0} style="percent" value={0.64} />
          <KPI.Progress status="warning" value={64} />
        </KPI.Content>
      </KPI>
    </div>
  )
}
