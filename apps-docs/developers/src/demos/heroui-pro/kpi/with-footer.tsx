// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleDollar, Persons } from '@gravity-ui/icons'

import { KPI } from '@vezham/react-pro-v3/kpi'
import { Link } from '@vezham/react-v3'

export function WithFooter() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2">
      <KPI>
        <KPI.Header>
          <KPI.Icon status="success">
            <Persons />
          </KPI.Icon>
          <KPI.Title>Total Subscribers</KPI.Title>
          <KPI.Trend className="ml-auto" trend="up">
            +122
          </KPI.Trend>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value maximumFractionDigits={0} value={71897} />
        </KPI.Content>
        <KPI.Footer>
          <Link className="text-sm" href="#">
            View all
          </Link>
        </KPI.Footer>
      </KPI>

      <KPI>
        <KPI.Header>
          <KPI.Icon status="warning">
            <CircleDollar />
          </KPI.Icon>
          <KPI.Title>Monthly Revenue</KPI.Title>
          <KPI.Trend className="ml-auto" trend="up">
            +20.1%
          </KPI.Trend>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency="USD"
            maximumFractionDigits={0}
            style="currency"
            value={45231}
          />
        </KPI.Content>
        <KPI.Footer>
          <Link className="text-sm" href="#">
            View report
          </Link>
        </KPI.Footer>
      </KPI>
    </div>
  )
}
