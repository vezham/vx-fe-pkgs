// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleDollar } from '@gravity-ui/icons'

import { ChartTooltip, TrendChip } from '@vezham/react-pro-v3'
import { AreaChart } from '@vezham/react-pro-v3/area-chart'
import { KPI } from '@vezham/react-pro-v3/kpi'

const revenue = [
  { month: 'January', value: 12400 },
  { month: 'February', value: 13200 },
  { month: 'March', value: 12800 },
  { month: 'April', value: 15100 },
  { month: 'May', value: 14600 },
  { month: 'June', value: 16800 },
  { month: 'July', value: 17400 },
  { month: 'August', value: 16900 },
  { month: 'September', value: 18700 },
  { month: 'October', value: 19500 },
  { month: 'November', value: 19100 },
  { month: 'December', value: 21300 }
]

export function WithChartTooltip() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2">
      <KPI>
        <KPI.Header>
          <KPI.Icon status="success">
            <CircleDollar />
          </KPI.Icon>
          <KPI.Title>Monthly Revenue</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              currency="USD"
              maximumFractionDigits={0}
              style="currency"
              value={21300}
            />
            <div className="flex items-center gap-1.5">
              <TrendChip trend="up" variant="tertiary">
                11.5%
                <TrendChip.Suffix>last 30d</TrendChip.Suffix>
              </TrendChip>
            </div>
          </div>
          <KPI.Chart
            color="var(--color-success)"
            data={revenue}
            height={70}
            strokeWidth={1.5}
            tooltip={
              <AreaChart.Tooltip
                allowEscapeViewBox={{ x: true, y: true }}
                offset={0}
                content={({ active, payload }) => {
                  const point = payload?.[0]

                  if (!active || !point) return null

                  return (
                    // Anchor is at the hovered point; shift up + center to sit above it.
                    <div
                      style={{
                        transform: 'translate(-50%, calc(-100% - 10px))'
                      }}>
                      <ChartTooltip>
                        <ChartTooltip.Header>
                          {point.payload?.month}
                        </ChartTooltip.Header>
                        <ChartTooltip.Item>
                          <ChartTooltip.Indicator color={point.stroke} />
                          <ChartTooltip.Label>Revenue</ChartTooltip.Label>
                          <ChartTooltip.Value>
                            ${Number(point.value).toLocaleString()}
                          </ChartTooltip.Value>
                        </ChartTooltip.Item>
                      </ChartTooltip>
                    </div>
                  )
                }}
              />
            }
          />
        </KPI.Content>
      </KPI>
    </div>
  )
}
