// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { getLocalTimeZone, isToday } from '@internationalized/date'

import { Calendar } from '@vezham/react-v3'

const datesWithEvents = [3, 7, 12, 15, 21, 28]

export function WithIndicators() {
  return (
    <Calendar aria-label="Event date">
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
              {({ formattedDate }) => (
                <>
                  {formattedDate}
                  {(isToday(date, getLocalTimeZone()) ||
                    datesWithEvents.includes(date.day)) && (
                    <Calendar.CellIndicator />
                  )}
                </>
              )}
            </Calendar.Cell>
          )}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  )
}
