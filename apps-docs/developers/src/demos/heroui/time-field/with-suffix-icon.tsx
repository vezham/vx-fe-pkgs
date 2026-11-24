// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Clock } from '@gravity-ui/icons'

import { Label, TimeField } from '@vezham/react-v3'

export function WithSuffixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>
          {segment => <TimeField.Segment segment={segment} />}
        </TimeField.Input>
        <TimeField.Suffix>
          <Clock className="text-muted size-4" />
        </TimeField.Suffix>
      </TimeField.Group>
    </TimeField>
  )
}
