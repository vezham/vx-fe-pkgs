// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import Minus from '@gravity-ui/icons/Minus'
import Plus from '@gravity-ui/icons/Plus'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'
import { Button } from '@vezham/react-v3'

export function WithCustomButtons() {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col items-center gap-5">
        {(['primary', 'secondary', 'tertiary', 'outline'] as const).map(
          variant => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <span className="text-muted text-xs">{variant}</span>
              <NumberStepper
                aria-label={`Quantity ${variant}`}
                defaultValue={1}
                maxValue={10}
                minValue={0}>
                <NumberStepper.Group className="gap-3">
                  <Button
                    isIconOnly
                    size="sm"
                    slot="decrement"
                    variant={variant}>
                    <Minus />
                  </Button>
                  <NumberStepper.Value />
                  <Button
                    isIconOnly
                    size="sm"
                    slot="increment"
                    variant={variant}>
                    <Plus />
                  </Button>
                </NumberStepper.Group>
              </NumberStepper>
            </div>
          )
        )}
      </div>
      <div className="flex flex-col items-center gap-5">
        {(['primary', 'secondary', 'tertiary', 'outline'] as const).map(
          variant => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <span className="text-muted text-xs">{variant}</span>
              <NumberStepper
                aria-label={`Quantity ${variant} no bg`}
                defaultValue={1}
                maxValue={10}
                minValue={0}>
                <NumberStepper.Group className="gap-3 bg-transparent">
                  <Button
                    isIconOnly
                    size="sm"
                    slot="decrement"
                    variant={variant}>
                    <Minus />
                  </Button>
                  <NumberStepper.Value />
                  <Button
                    isIconOnly
                    size="sm"
                    slot="increment"
                    variant={variant}>
                    <Plus />
                  </Button>
                </NumberStepper.Group>
              </NumberStepper>
            </div>
          )
        )}
      </div>
    </div>
  )
}
