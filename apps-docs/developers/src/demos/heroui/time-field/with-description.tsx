// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Description, Label, TimeField } from '@vezham/react-v3'

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField className="w-[256px]" name="time">
        <Label>Start time</Label>
        <TimeField.Group>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
        <Description>Enter the start time</Description>
      </TimeField>
      <TimeField className="w-[256px]" name="end-time">
        <Label>End time</Label>
        <TimeField.Group>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
        <Description>Enter the end time</Description>
      </TimeField>
    </div>
  )
}
