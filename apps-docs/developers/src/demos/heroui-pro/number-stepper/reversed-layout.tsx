// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function ReversedLayout() {
  return (
    <NumberStepper
      aria-label="Quantity"
      defaultValue={1}
      maxValue={99}
      minValue={0}>
      <NumberStepper.Group>
        <NumberStepper.IncrementButton />
        <NumberStepper.Value />
        <NumberStepper.DecrementButton />
      </NumberStepper.Group>
    </NumberStepper>
  )
}
