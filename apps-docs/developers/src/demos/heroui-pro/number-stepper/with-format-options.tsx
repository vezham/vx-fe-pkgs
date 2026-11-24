// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function WithFormatOptions() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-xs">Currency (USD)</span>
        <NumberStepper
          aria-label="Price"
          defaultValue={10}
          formatOptions={{ currency: 'USD', style: 'currency' }}
          maxValue={100}
          minValue={0}>
          <NumberStepper.Group>
            <NumberStepper.DecrementButton />
            <NumberStepper.Value />
            <NumberStepper.IncrementButton />
          </NumberStepper.Group>
        </NumberStepper>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-xs">Percentage</span>
        <NumberStepper
          aria-label="Opacity"
          defaultValue={50}
          formatOptions={{ style: 'unit', unit: 'percent' }}
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
