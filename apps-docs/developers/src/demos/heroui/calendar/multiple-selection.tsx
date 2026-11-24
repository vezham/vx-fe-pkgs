// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import type { DateValue } from '@internationalized/date'
import { useState } from 'react'

import { Calendar, Description } from '@vezham/react-v3'

export function MultipleSelection() {
  const [value, setValue] = useState<readonly DateValue[]>([])

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Event dates"
        selectionMode="multiple"
        value={value}
        onChange={setValue}>
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
        {value?.length
          ? `${value.length} date(s) selected`
          : 'Select multiple dates'}
      </Description>
    </div>
  )
}
