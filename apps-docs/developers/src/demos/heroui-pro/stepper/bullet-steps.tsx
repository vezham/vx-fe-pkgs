// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleFill from '@gravity-ui/icons/CircleFill'
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

export function BulletSteps() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col gap-8">
      <div className="w-[500px]">
        <Stepper currentStep={step} onStepChange={setStep}>
          {checkoutSteps.map(s => (
            <Stepper.Step key={s.title}>
              <Stepper.Indicator>
                <Stepper.Icon>
                  <CircleFill />
                </Stepper.Icon>
              </Stepper.Indicator>
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
              <Stepper.Indicator>
                <Stepper.Icon>
                  <CircleFill />
                </Stepper.Icon>
              </Stepper.Indicator>
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
