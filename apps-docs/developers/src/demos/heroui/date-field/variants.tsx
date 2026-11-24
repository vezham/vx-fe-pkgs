// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { DateField, Label } from '@vezham/react-v3'

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="primary-date">
        <Label>Primary variant</Label>
        <DateField.Group variant="primary">
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField className="w-[256px]" name="secondary-date">
        <Label>Secondary variant</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
    </div>
  )
}
