// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Calendar } from '@gravity-ui/icons'

import { DateField, Label } from '@vezham/react-v3'

export function WithPrefixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Prefix>
          <Calendar className="text-muted size-4" />
        </DateField.Prefix>
        <DateField.Input>
          {segment => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.Group>
    </DateField>
  )
}
