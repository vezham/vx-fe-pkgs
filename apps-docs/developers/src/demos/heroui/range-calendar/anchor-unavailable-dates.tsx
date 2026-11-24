// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import type { CalendarDate, DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'

import { Description, RangeCalendar } from '@vezham/react-v3'

export function AnchorUnavailableDates() {
  const now = today(getLocalTimeZone())

  const isDateUnavailable = (
    date: DateValue,
    anchorDate: CalendarDate | null
  ) => {
    return anchorDate != null && Math.abs(date.compare(anchorDate)) > 7
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        aria-label="Trip dates"
        isDateUnavailable={isDateUnavailable}
        minValue={now}>
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
      <Description className="text-center">
        After selecting a start date, only dates within 7 days are available
      </Description>
    </div>
  )
}
