// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function WithStep() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-xs">Step: 5</span>
        <NumberStepper
          aria-label="Quantity step 5"
          defaultValue={0}
          maxValue={100}
          minValue={0}
          step={5}>
          <NumberStepper.Group>
            <NumberStepper.DecrementButton />
            <NumberStepper.Value />
            <NumberStepper.IncrementButton />
          </NumberStepper.Group>
        </NumberStepper>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-xs">Step: 10</span>
        <NumberStepper
          aria-label="Quantity step 10"
          defaultValue={0}
          maxValue={100}
          minValue={0}
          step={10}>
          <NumberStepper.Group>
            <NumberStepper.DecrementButton />
            <NumberStepper.Value />
            <NumberStepper.IncrementButton />
          </NumberStepper.Group>
        </NumberStepper>
      </div>
    </div>
  )
}
