// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleCheck, Clock } from '@gravity-ui/icons'

import { TrendChip } from '@vezham/react-pro-v3'
import { KPI } from '@vezham/react-pro-v3/kpi'

// Median durations, in minutes. The support desk is closed on weekends, so those days have no
// median at all — `null`, not zero. `connectNulls` bridges the gap instead of breaking the line.
const timeToFirstResponse = [
  { day: 'Mon', value: 24 },
  { day: 'Tue', value: 21 },
  { day: 'Wed', value: 26 },
  { day: 'Thu', value: 19 },
  { day: 'Fri', value: 22 },
  { day: 'Sat', value: null },
  { day: 'Sun', value: null },
  { day: 'Mon', value: 18 },
  { day: 'Tue', value: 20 },
  { day: 'Wed', value: 17 },
  { day: 'Thu', value: 15 },
  { day: 'Fri', value: 16 }
]

const timeToResolve = [
  { day: 'Mon', value: 186 },
  { day: 'Tue', value: 174 },
  { day: 'Wed', value: 192 },
  { day: 'Thu', value: 168 },
  { day: 'Fri', value: 177 },
  { day: 'Sat', value: null },
  { day: 'Sun', value: null },
  { day: 'Mon', value: 158 },
  { day: 'Tue', value: 163 },
  { day: 'Wed', value: 149 },
  { day: 'Thu', value: 152 },
  { day: 'Fri', value: 141 }
]

export function WithChartConnectNulls() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2">
      <KPI>
        <KPI.Header>
          <Clock className="text-muted size-4" />
          <KPI.Title>Time to First Response</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              style="unit"
              unit="minute"
              value={16}
            />
            <div className="flex items-center gap-1.5">
              <TrendChip trend="down" variant="tertiary">
                27%
                <TrendChip.Suffix>vs last week</TrendChip.Suffix>
              </TrendChip>
            </div>
          </div>
          <KPI.Chart
            connectNulls
            color="var(--color-success)"
            data={timeToFirstResponse}
            height={70}
            strokeWidth={1.5}
          />
        </KPI.Content>
      </KPI>

      <KPI>
        <KPI.Header>
          <CircleCheck className="text-muted size-4" />
          <KPI.Title>Time to Resolve</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              style="unit"
              unit="minute"
              value={141}
            />
            <div className="flex items-center gap-1.5">
              <TrendChip trend="down" variant="tertiary">
                20%
                <TrendChip.Suffix>vs last week</TrendChip.Suffix>
              </TrendChip>
            </div>
          </div>
          <KPI.Chart
            connectNulls
            color="var(--color-accent)"
            data={timeToResolve}
            height={70}
            strokeWidth={1.5}
          />
        </KPI.Content>
      </KPI>
    </div>
  )
}
