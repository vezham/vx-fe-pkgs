// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { parseDate } from '@internationalized/date'

import { RangeCalendar } from '@vezham/react-v3'

const cellClassName = [
  'rounded-md',
  '**:data-[slot=range-calendar-cell-button]:rounded-md',
  'data-[outside-month=true]:text-muted data-[outside-month=true]:opacity-50',
  'data-[hovered=true]:not-data-[selected=true]:**:data-[slot=range-calendar-cell-button]:bg-default',
  'data-[today=true]:**:data-[slot=range-calendar-cell-button]:bg-success-soft',
  'data-[today=true]:**:data-[slot=range-calendar-cell-button]:text-success-soft-foreground',
  'data-[today=true]:data-[hovered=true]:not-data-[selected=true]:**:data-[slot=range-calendar-cell-button]:bg-success-soft-hover',
  'data-[selected=true]:rounded-none data-[selected=true]:bg-success-soft',
  'data-[outside-month=true]:data-[selected=true]:bg-default/20',
  'data-[selection-start=true]:rounded-tl-md data-[selection-start=true]:rounded-bl-md',
  'data-[selection-end=true]:rounded-tr-md data-[selection-end=true]:rounded-br-md',
  'data-[selection-start=true]:**:data-[slot=range-calendar-cell-button]:bg-success',
  'data-[selection-start=true]:**:data-[slot=range-calendar-cell-button]:text-success-foreground',
  'data-[selection-start=true]:data-[pressed=true]:**:data-[slot=range-calendar-cell-button]:bg-success-hover',
  'data-[selection-end=true]:**:data-[slot=range-calendar-cell-button]:bg-success',
  'data-[selection-end=true]:**:data-[slot=range-calendar-cell-button]:text-success-foreground',
  'data-[selection-end=true]:data-[pressed=true]:**:data-[slot=range-calendar-cell-button]:bg-success-hover'
].join(' ')

export function CustomStyles() {
  return (
    <RangeCalendar
      aria-label="Hotel stay"
      className="border-border/80 bg-surface ring-success/10 w-63 rounded-xl border p-3 shadow-sm ring-1"
      defaultValue={{
        end: parseDate('2025-02-14'),
        start: parseDate('2025-02-08')
      }}
      firstDayOfWeek="mon">
      <RangeCalendar.Header className="px-0.5 pb-4">
        <RangeCalendar.Heading className="text-foreground text-sm font-medium" />
        <RangeCalendar.NavButton
          className="text-success hover:bg-success-soft rounded-md active:scale-95"
          slot="previous"
        />
        <RangeCalendar.NavButton
          className="text-success hover:bg-success-soft rounded-md active:scale-95"
          slot="next"
        />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader>
          {day => (
            <RangeCalendar.HeaderCell className="text-muted pb-2 text-xs font-medium">
              {day}
            </RangeCalendar.HeaderCell>
          )}
        </RangeCalendar.GridHeader>
        <RangeCalendar.GridBody>
          {date => <RangeCalendar.Cell className={cellClassName} date={date} />}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
    </RangeCalendar>
  )
}
