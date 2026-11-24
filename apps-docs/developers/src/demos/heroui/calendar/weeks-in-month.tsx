// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Calendar, Description } from '@vezham/react-v3'

export function WeeksInMonth() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar aria-label="Event date" weeksInMonth={6}>
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
        Always shows 6 weeks per month to avoid layout shift when navigating
      </Description>
    </div>
  )
}
