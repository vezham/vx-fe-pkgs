// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberStepper } from '@vezham/react-pro-v3/number-stepper'

export function CustomIcons() {
  return (
    <NumberStepper
      aria-label="Zoom level"
      defaultValue={100}
      maxValue={200}
      minValue={50}
      step={10}>
      <NumberStepper.Group>
        <NumberStepper.DecrementButton>
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="8" x2="14" y1="11" y2="11" />
          </svg>
        </NumberStepper.DecrementButton>
        <NumberStepper.Value />
        <NumberStepper.IncrementButton>
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="11" x2="11" y1="8" y2="14" />
            <line x1="8" x2="14" y1="11" y2="11" />
          </svg>
        </NumberStepper.IncrementButton>
      </NumberStepper.Group>
    </NumberStepper>
  )
}
