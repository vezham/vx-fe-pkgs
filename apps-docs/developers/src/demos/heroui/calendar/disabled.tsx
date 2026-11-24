// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { getLocalTimeZone, today } from '@internationalized/date'

import { Calendar, Description } from '@vezham/react-v3'

export function Disabled() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        isDisabled
        aria-label="Event date"
        defaultValue={today(getLocalTimeZone())}>
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
      <Description className="text-center">Calendar is disabled</Description>
    </div>
  )
}
