// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { getLocalTimeZone, today } from '@internationalized/date'

import { Calendar, Description } from '@vezham/react-v3'

export function MinMaxDates() {
  const now = today(getLocalTimeZone())
  const minDate = now
  const maxDate = now.add({ months: 3 })

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Appointment date"
        maxValue={maxDate}
        minValue={minDate}>
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {date => <Calendar.Cell date={date} />}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
      <Description className="text-center">
        Select a date between today and {maxDate.toString()}
      </Description>
    </div>
  )
}
