// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Stepper } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

const steps = [
  { description: 'Create your account', title: 'Account' },
  { description: 'Set up your profile', title: 'Profile' },
  { description: 'Configure preferences', title: 'Settings' },
  { description: 'Review and confirm', title: 'Review' }
]

export function Controlled() {
  const [step, setStep] = useState(0)
  const totalSteps = steps.length

  return (
    <div className="flex w-[600px] flex-col gap-6">
      <Stepper currentStep={step} onStepChange={setStep}>
        {steps.map(s => (
          <Stepper.Step key={s.title}>
            <Stepper.Indicator />
            <Stepper.Content>
              <Stepper.Title>{s.title}</Stepper.Title>
              <Stepper.Description>{s.description}</Stepper.Description>
            </Stepper.Content>
            <Stepper.Separator />
          </Stepper.Step>
        ))}
      </Stepper>
      <div className="flex items-center justify-between">
        <Button
          isDisabled={step === 0}
          size="sm"
          variant="outline"
          onPress={() => setStep(s => Math.max(0, s - 1))}>
          Previous
        </Button>
        <span className="text-muted text-sm">
          Step {step + 1} of {totalSteps}
        </span>
        <Button
          isDisabled={step === totalSteps - 1}
          size="sm"
          onPress={() => setStep(s => Math.min(totalSteps - 1, s + 1))}>
          Next
        </Button>
      </div>
    </div>
  )
}
