// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import BellFill from '@gravity-ui/icons/BellFill'
import LockFill from '@gravity-ui/icons/LockFill'
import PersonFill from '@gravity-ui/icons/PersonFill'
import ThumbsUpFill from '@gravity-ui/icons/ThumbsUpFill'
import { useState } from 'react'

import { Stepper } from '@vezham/react-pro-v3'

const steps = [
  {
    description: 'Create your account',
    icon: <PersonFill height={24} width={24} />,
    title: 'Account'
  },
  {
    description: 'Configure preferences',
    icon: <BellFill height={24} width={24} />,
    title: 'Settings'
  },
  {
    description: 'Security options',
    icon: <LockFill height={24} width={24} />,
    title: 'Security'
  },
  {
    description: 'Review and confirm',
    icon: <ThumbsUpFill height={24} width={24} />,
    title: 'Confirm'
  }
]

export function VerticalWithIcons() {
  const [step, setStep] = useState(2)

  return (
    <div className="w-[320px]">
      <Stepper currentStep={step} orientation="vertical" onStepChange={setStep}>
        {steps.map(s => (
          <Stepper.Step key={s.title}>
            <Stepper.Indicator>
              <Stepper.Icon>{s.icon}</Stepper.Icon>
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
  )
}
