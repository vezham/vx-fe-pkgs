// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function Controlled() {
  const [value, setValue] = useState(5)

  return (
    <div className="flex flex-col items-center gap-4">
      <NumberStepper
        aria-label="Quantity"
        maxValue={20}
        minValue={0}
        value={value}
        onChange={setValue}>
        <NumberStepper.Group>
          <NumberStepper.DecrementButton />
          <NumberStepper.Value />
          <NumberStepper.IncrementButton />
        </NumberStepper.Group>
      </NumberStepper>
      <span className="text-muted text-sm">Value: {value}</span>
    </div>
  )
}
