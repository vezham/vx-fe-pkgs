// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function Disabled() {
  return (
    <NumberStepper
      isDisabled
      aria-label="Quantity"
      defaultValue={3}
      maxValue={10}
      minValue={0}>
      <NumberStepper.Group>
        <NumberStepper.DecrementButton />
        <NumberStepper.Value />
        <NumberStepper.IncrementButton />
      </NumberStepper.Group>
    </NumberStepper>
  )
}
