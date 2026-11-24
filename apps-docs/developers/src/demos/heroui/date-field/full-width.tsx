// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Calendar, ChevronDown } from '@gravity-ui/icons'

import { DateField, Label } from '@vezham/react-v3'

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <DateField fullWidth name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField fullWidth name="date-icons">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Prefix>
            <Calendar className="text-muted size-4" />
          </DateField.Prefix>
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <ChevronDown className="text-muted size-4" />
          </DateField.Suffix>
        </DateField.Group>
      </DateField>
    </div>
  )
}
