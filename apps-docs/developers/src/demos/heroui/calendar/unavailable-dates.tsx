// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import type { DateValue } from '@internationalized/date'
import { isWeekend } from '@internationalized/date'
import { useLocale } from 'react-aria-components'

import { Calendar, Description } from '@vezham/react-v3'

export function UnavailableDates() {
  const { locale } = useLocale()
  const isDateUnavailable = (date: DateValue) => isWeekend(date, locale)

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Appointment date"
        isDateUnavailable={isDateUnavailable}>
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
        Weekends are unavailable
      </Description>
    </div>
  )
}
