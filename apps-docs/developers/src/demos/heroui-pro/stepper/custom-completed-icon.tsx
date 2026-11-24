// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleCheckFill from '@gravity-ui/icons/CircleCheckFill'
import { useState } from 'react'

import { Stepper } from '@vezham/react-pro-v3'

const checkoutSteps = [
  { title: 'Cart' },
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

const accountSteps = [
  { description: 'Create your account', title: 'Account' },
  { description: 'Set up your profile', title: 'Profile' },
  { description: 'Configure preferences', title: 'Settings' },
  { description: 'Review and confirm', title: 'Review' }
]

function CustomIndicator() {
  const { status } = Stepper.useStep()

  return (
    <Stepper.Indicator>
      {status === 'complete' ? (
        <Stepper.Icon>
          <CircleCheckFill />
        </Stepper.Icon>
      ) : null}
    </Stepper.Indicator>
  )
}

export function CustomCompletedIcon() {
  const [step, setStep] = useState(2)

  return (
    <div className="flex flex-col gap-8">
      <div className="w-[500px]">
        <Stepper currentStep={step} onStepChange={setStep}>
          {checkoutSteps.map(s => (
            <Stepper.Step key={s.title}>
              <CustomIndicator />
              <Stepper.Content>
                <Stepper.Title>{s.title}</Stepper.Title>
              </Stepper.Content>
              <Stepper.Separator />
            </Stepper.Step>
          ))}
        </Stepper>
      </div>
      <div className="w-[280px]">
        <Stepper
          currentStep={step}
          orientation="vertical"
          onStepChange={setStep}>
          {accountSteps.map(s => (
            <Stepper.Step key={s.title}>
              <CustomIndicator />
              <Stepper.Content>
                <Stepper.Title>{s.title}</Stepper.Title>
                <Stepper.Description>{s.description}</Stepper.Description>
              </Stepper.Content>
              <Stepper.Separator />
            </Stepper.Step>
          ))}
        </Stepper>
      </div>
    </div>
  )
}
