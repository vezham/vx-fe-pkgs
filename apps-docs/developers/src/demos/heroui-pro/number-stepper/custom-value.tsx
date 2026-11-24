// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function CustomValue() {
  return (
    <NumberStepper
      aria-label="Quantity"
      defaultValue={3}
      maxValue={10}
      minValue={0}>
      <NumberStepper.Group>
        <NumberStepper.DecrementButton />
        <NumberStepper.Value>
          {({ value }) => (
            <span className="mx-2">
              {value} {value === 1 ? 'item' : 'items'}
            </span>
          )}
        </NumberStepper.Value>
        <NumberStepper.IncrementButton />
      </NumberStepper.Group>
    </NumberStepper>
  )
}
