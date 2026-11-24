// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Stepper } from '@vezham/react-pro-v3'

const steps = [
  { title: 'Cart' },
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

export function CustomColor() {
  return (
    <div className="flex flex-col gap-6">
      {(
        [
          { label: 'Accent (default)', vars: {} },
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
            label: 'Warning',
            vars: {
              '--stepper-active-color': 'var(--color-warning)',
              '--stepper-complete-color': 'var(--color-warning)',
              '--stepper-complete-fg': 'var(--color-warning-foreground)'
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
          <div className="w-[500px]">
            <Stepper currentStep={2} style={vars as React.CSSProperties}>
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
        </div>
      ))}
    </div>
  )
}
