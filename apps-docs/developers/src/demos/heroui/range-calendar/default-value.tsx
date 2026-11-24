// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { parseDate } from '@internationalized/date'

import { RangeCalendar } from '@vezham/react-v3'

export function DefaultValue() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{
        end: parseDate('2025-02-12'),
        start: parseDate('2025-02-03')
      }}
      firstDayOfWeek="mon">
      <RangeCalendar.Header>
        <RangeCalendar.Heading />
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.NavButton slot="next" />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader>
          {day => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
        </RangeCalendar.GridHeader>
        <RangeCalendar.GridBody>
          {date => <RangeCalendar.Cell date={date} />}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
    </RangeCalendar>
  )
}
