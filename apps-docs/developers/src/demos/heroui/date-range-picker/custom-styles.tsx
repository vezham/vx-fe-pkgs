// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import {
  DateField,
  DateRangePicker,
  Label,
  RangeCalendar
} from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <DateRangePicker className="w-80" endName="checkout" startName="checkin">
      <Label>Stay dates</Label>
      <DateField.Group
        fullWidth
        className="border-border/80 bg-default rounded-xl border shadow-sm"
        variant="secondary">
        <DateField.Input slot="start">
          {segment => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator className="text-muted" />
        <DateField.Input slot="end">
          {segment => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DateRangePicker.Trigger className="text-muted">
            <DateRangePicker.TriggerIndicator />
          </DateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DateRangePicker.Popover className="border-border/80 border shadow-sm">
        <RangeCalendar
          aria-label="Stay dates"
          className="bg-surface rounded-2xl p-2">
          <RangeCalendar.Header>
            <RangeCalendar.Heading className="text-foreground font-medium" />
            <RangeCalendar.NavButton
              className="text-muted hover:bg-default"
              slot="previous"
            />
            <RangeCalendar.NavButton
              className="text-muted hover:bg-default"
              slot="next"
            />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {day => (
                <RangeCalendar.HeaderCell className="text-muted text-xs">
                  {day}
                </RangeCalendar.HeaderCell>
              )}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {date => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
      </DateRangePicker.Popover>
    </DateRangePicker>
  )
}
