// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function Sizes() {
  return (
    <div className="flex items-center gap-6">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-muted text-xs">{size}</span>
          <NumberStepper
            aria-label={`Quantity ${size}`}
            defaultValue={1}
            maxValue={99}
            minValue={0}
            size={size}>
            <NumberStepper.Group>
              <NumberStepper.DecrementButton />
              <NumberStepper.Value />
              <NumberStepper.IncrementButton />
            </NumberStepper.Group>
          </NumberStepper>
        </div>
      ))}
    </div>
  )
}
