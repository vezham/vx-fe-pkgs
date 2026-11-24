// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ChevronDown, Clock } from '@gravity-ui/icons'

import { Description, Label, TimeField } from '@vezham/react-v3'

export function WithPrefixAndSuffix() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
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
      <Description>Enter a time</Description>
    </TimeField>
  )
}
