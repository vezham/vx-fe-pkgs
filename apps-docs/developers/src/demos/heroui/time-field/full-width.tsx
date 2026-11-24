// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ChevronDown, Clock } from '@gravity-ui/icons'

import { Label, TimeField } from '@vezham/react-v3'

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TimeField fullWidth name="time">
        <Label>Time</Label>
        <TimeField.Group fullWidth>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
      </TimeField>
      <TimeField fullWidth name="time-icons">
        <Label>Time</Label>
        <TimeField.Group fullWidth>
          <TimeField.Prefix>
            <Clock className="text-muted size-4" />
          </TimeField.Prefix>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
          <TimeField.Suffix>
            <ChevronDown className="text-muted size-4" />
          </TimeField.Suffix>
        </TimeField.Group>
      </TimeField>
    </div>
  )
}
