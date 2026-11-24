// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Stepper } from '@vezham/react-pro-v3'

const steps = [
  { description: 'Create your account', title: 'Account' },
  { description: 'Set up your profile', title: 'Profile' },
  { description: 'Configure preferences', title: 'Settings' },
  { description: 'Review and confirm', title: 'Review' }
]

export function CustomColorVertical() {
  return (
    <div className="flex gap-10">
      {(
        [
          { label: 'Accent', vars: {} },
          {
            label: 'Success',
            vars: {
              '--stepper-active-color': 'var(--color-success)',
              '--stepper-complete-color': 'var(--color-success)',
              '--stepper-complete-fg': 'var(--color-success-foreground)'
            }
          },
          {
            label: 'Danger',
            vars: {
              '--stepper-active-color': 'var(--color-danger)',
              '--stepper-complete-color': 'var(--color-danger)',
              '--stepper-complete-fg': 'var(--color-danger-foreground)'
            }
          },
          {
            label: 'Inverted',
            vars: {
              '--stepper-active-color': 'var(--color-foreground)',
              '--stepper-complete-color': 'var(--color-foreground)',
              '--stepper-complete-fg': 'var(--color-background)',
              '--stepper-inactive-border': 'var(--color-foreground)',
              '--stepper-inactive-fg': 'var(--color-foreground)'
            }
          }
        ] as const
      ).map(({ label, vars }) => (
        <div key={label} className="flex flex-col gap-1.5">
          <span className="text-muted text-xs font-medium">{label}</span>
          <Stepper
            currentStep={2}
            orientation="vertical"
            style={vars as React.CSSProperties}>
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
