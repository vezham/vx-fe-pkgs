// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import React from 'react'

import { Button, Description, Label, NumberField } from '@vezham/react-v3'

export function Controlled() {
  const [value, setValue] = React.useState(1024)

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField minValue={0} name="width" value={value} onChange={setValue}>
        <Label>Width</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Current value: {value}</Description>
      </NumberField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue(0)}>
          Reset to 0
        </Button>
        <Button variant="tertiary" onPress={() => setValue(2048)}>
          Set to 2048
        </Button>
      </div>
    </div>
  )
}
