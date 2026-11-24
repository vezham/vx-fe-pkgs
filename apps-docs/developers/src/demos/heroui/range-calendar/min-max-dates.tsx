// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { getLocalTimeZone, today } from '@internationalized/date'

import { Description, RangeCalendar } from '@vezham/react-v3'

export function MinMaxDates() {
  const now = today(getLocalTimeZone())
  const minDate = now
  const maxDate = now.add({ months: 3 })

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        aria-label="Trip dates"
        maxValue={maxDate}
        minValue={minDate}>
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
        Select dates between today and {maxDate.toString()}
      </Description>
    </div>
  )
}
