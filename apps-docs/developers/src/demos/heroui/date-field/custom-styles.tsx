// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { DateField, Label } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <DateField className="w-64" name="due-date">
      <Label>Due date</Label>
      <DateField.Group
        className="border-border/80 bg-default rounded-xl border shadow-sm"
        variant="secondary">
        <DateField.Input>
          {segment => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.Group>
    </DateField>
  )
}
