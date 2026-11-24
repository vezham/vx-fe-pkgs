// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Calendar, DateField, DatePicker, Label } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <DatePicker className="w-72" name="event-date">
      <Label>Event date</Label>
      <DateField.Group
        fullWidth
        className="border-border/80 bg-default rounded-xl border shadow-sm"
        variant="secondary">
        <DateField.Input>
          {segment => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger className="text-muted">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover className="border-border/80 border shadow-sm">
        <Calendar
          aria-label="Event date"
          className="bg-surface rounded-2xl p-2">
          <Calendar.Header>
            <Calendar.Heading className="text-foreground font-medium" />
            <Calendar.NavButton
              className="text-muted hover:bg-default"
              slot="previous"
            />
            <Calendar.NavButton
              className="text-muted hover:bg-default"
              slot="next"
            />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {day => (
                <Calendar.HeaderCell className="text-muted text-xs">
                  {day}
                </Calendar.HeaderCell>
              )}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {date => (
                <Calendar.Cell
                  className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-lg"
                  date={date}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  )
}
