// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import type { CalendarDate, DateValue } from '@internationalized/date'
import { getLocalTimeZone, isWeekend, today } from '@internationalized/date'
import { useState } from 'react'
import { useLocale } from 'react-aria-components'

import { Button, Calendar } from '@vezham/react-v3'

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null)
  const { locale } = useLocale()

  const bookedDates = [5, 6, 12, 13, 14, 20]

  const isDateUnavailable = (date: DateValue) => {
    return isWeekend(date, locale) || bookedDates.includes(date.day)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Booking date"
        isDateUnavailable={isDateUnavailable}
        minValue={today(getLocalTimeZone())}
        value={selectedDate}
        onChange={setSelectedDate}>
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
            {date => (
              <Calendar.Cell date={date}>
                {({ formattedDate, isUnavailable }) => (
                  <>
                    {formattedDate}
                    {!isUnavailable &&
                      !isWeekend(date, locale) &&
                      bookedDates.includes(date.day) && (
                        <Calendar.CellIndicator />
                      )}
                  </>
                )}
              </Calendar.Cell>
            )}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>

      <div className="flex flex-col gap-2 text-center">
        <div className="text-muted flex items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="bg-muted size-2 rounded-full" /> Has bookings
          </span>
          <span className="flex items-center gap-1">
            <span className="bg-default size-2 rounded-full" />{' '}
            Weekend/Unavailable
          </span>
        </div>
        {selectedDate ? (
          <Button size="sm" variant="primary">
            Book {selectedDate.toString()}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
