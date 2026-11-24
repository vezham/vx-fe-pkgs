// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleCheckFill from '@gravity-ui/icons/CircleCheckFill'
import CircleFill from '@gravity-ui/icons/CircleFill'
import { useState } from 'react'

import { Stepper } from '@vezham/react-pro-v3'

const steps = [
  { description: 'Create your account', title: 'Account' },
  { description: 'Set up your profile', title: 'Profile' },
  { description: 'Configure preferences', title: 'Settings' },
  { description: 'Review and confirm', title: 'Review' }
]

function StatusIndicator() {
  const { status } = Stepper.useStep()

  return (
    <Stepper.Indicator>
      <Stepper.Icon>
        {status === 'complete' ? <CircleCheckFill /> : <CircleFill />}
      </Stepper.Icon>
    </Stepper.Indicator>
  )
}

export function RenderFunction() {
  const [step, setStep] = useState(1)

  return (
    <div className="w-[280px]">
      <Stepper currentStep={step} orientation="vertical" onStepChange={setStep}>
        {steps.map(s => (
          <Stepper.Step key={s.title}>
            <StatusIndicator />
            <Stepper.Content>
              <Stepper.Title>{s.title}</Stepper.Title>
              <Stepper.Description>{s.description}</Stepper.Description>
            </Stepper.Content>
            <Stepper.Separator />
          </Stepper.Step>
        ))}
      </Stepper>
    </div>
  )
}
