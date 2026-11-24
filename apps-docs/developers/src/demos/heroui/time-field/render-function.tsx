// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Label, TimeField } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <TimeField
      className="w-[256px]"
      name="time"
      render={props => <div {...props} data-custom="foo" />}>
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>
          {segment => <TimeField.Segment segment={segment} />}
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
  )
}
