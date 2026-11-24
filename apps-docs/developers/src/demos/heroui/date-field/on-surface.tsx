// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Calendar } from '@gravity-ui/icons'

import { DateField, Description, Label, Surface } from '@vezham/react-v3'

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <DateField className="w-full" name="date">
        <Label>Date</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
        <Description>Enter a date</Description>
      </DateField>
      <DateField className="w-full" name="date-2">
        <Label>Appointment date</Label>
        <DateField.Group variant="secondary">
          <DateField.Prefix>
            <Calendar className="text-muted size-4" />
          </DateField.Prefix>
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
        <Description>Enter a date for your appointment</Description>
      </DateField>
    </Surface>
  )
}
