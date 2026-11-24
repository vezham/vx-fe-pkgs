// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Time, getLocalTimeZone, now } from '@internationalized/date'
import { useState } from 'react'

import type { TimeValue } from '@vezham/react-v3'
import { Button, Description, Label, TimeField } from '@vezham/react-v3'

export function Controlled() {
  const [value, setValue] = useState<TimeValue | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <TimeField
        className="w-[256px]"
        name="time"
        value={value}
        onChange={setValue}>
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
        <Description>
          Current value: {value ? value.toString() : '(empty)'}
        </Description>
      </TimeField>
      <div className="flex gap-2">
        <Button
          variant="tertiary"
          onPress={() => {
            const currentTime = now(getLocalTimeZone())

            setValue(
              new Time(currentTime.hour, currentTime.minute, currentTime.second)
            )
          }}>
          Set now
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  )
}
