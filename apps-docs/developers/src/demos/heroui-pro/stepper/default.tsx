// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Stepper } from '@vezham/react-pro-v3'

const steps = [
  { title: 'Cart' },
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

export function Default() {
  const [step, setStep] = useState(1)

  return (
    <div className="w-[500px]">
      <Stepper currentStep={step} onStepChange={setStep}>
        {steps.map(s => (
          <Stepper.Step key={s.title}>
            <Stepper.Indicator />
            <Stepper.Content>
              <Stepper.Title>{s.title}</Stepper.Title>
            </Stepper.Content>
            <Stepper.Separator />
          </Stepper.Step>
        ))}
      </Stepper>
    </div>
  )
}
