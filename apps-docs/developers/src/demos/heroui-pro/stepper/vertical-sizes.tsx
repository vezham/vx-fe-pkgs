// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Stepper } from '@vezham/react-pro-v3'

const steps = [
  { description: 'Create your account', title: 'Account' },
  { description: 'Set up your profile', title: 'Profile' },
  { description: 'Configure preferences', title: 'Settings' },
  { description: 'Review and confirm', title: 'Review' }
]

export function VerticalSizes() {
  return (
    <div className="flex items-start gap-12">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-muted text-xs font-medium tracking-wider uppercase">
            {size}
          </span>
          <Stepper currentStep={1} orientation="vertical" size={size}>
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
      ))}
    </div>
  )
}
