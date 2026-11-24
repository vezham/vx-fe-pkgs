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

export function ControlledVertical() {
  const [step, setStep] = useState(0)
  const totalSteps = steps.length

  return (
    <div className="flex w-full gap-8">
      <div className="w-[200px]">
        <Stepper
          currentStep={step}
          orientation="vertical"
          onStepChange={setStep}>
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
      </div>
      <div className="flex w-[400px] flex-col gap-4">
        <div className="bg-surface rounded-xl p-6 shadow-sm">
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            {steps[step]?.title}
          </h3>
          <p className="text-muted text-sm">{steps[step]?.description}</p>
        </div>
        <div className="flex gap-3">
          <Button
            isDisabled={step === 0}
            size="sm"
            variant="outline"
            onPress={() => setStep(s => Math.max(0, s - 1))}>
            Back
          </Button>
          <Button
            isDisabled={step === totalSteps - 1}
            size="sm"
            onPress={() => setStep(s => Math.min(totalSteps - 1, s + 1))}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
