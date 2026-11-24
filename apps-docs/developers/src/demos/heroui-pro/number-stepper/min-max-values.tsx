// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function MinMaxValues() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-xs">Min: 0, Max: 5</span>
        <NumberStepper
          aria-label="Rating"
          defaultValue={3}
          maxValue={5}
          minValue={0}>
          <NumberStepper.Group>
            <NumberStepper.DecrementButton />
            <NumberStepper.Value />
            <NumberStepper.IncrementButton />
          </NumberStepper.Group>
        </NumberStepper>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-xs">Min: -10, Max: 10</span>
        <NumberStepper
          aria-label="Temperature"
          defaultValue={0}
          maxValue={10}
          minValue={-10}>
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
