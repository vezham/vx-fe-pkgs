// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'
import { Description, Label } from '@vezham/react-v3'

export function WithLabel() {
  return (
    <NumberStepper
      className="flex-col items-start gap-1.5"
      defaultValue={1}
      maxValue={10}
      minValue={1}>
      <Label>Guests</Label>
      <NumberStepper.Group>
        <NumberStepper.DecrementButton />
        <NumberStepper.Value />
        <NumberStepper.IncrementButton />
      </NumberStepper.Group>
      <Description>Maximum 10 guests per reservation</Description>
    </NumberStepper>
  )
}
