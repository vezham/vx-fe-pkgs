// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import BellFill from '@gravity-ui/icons/BellFill'
import Calendar from '@gravity-ui/icons/Calendar'
import LockOpenFill from '@gravity-ui/icons/LockOpenFill'

import { Stepper } from '@vezham/react-pro-v3'

export function FreeTrialTimeline() {
  return (
    <div className="w-[340px]">
      <h3 className="text-foreground mb-5 text-lg font-bold">
        Start your 14-day free trial
      </h3>
      <Stepper
        currentStep={0}
        orientation="vertical"
        size="lg"
        style={
          {
            '--stepper-active-color': 'var(--color-foreground)',
            '--stepper-inactive-border': 'var(--color-border)'
          } as React.CSSProperties
        }>
        <Stepper.Step>
          <Stepper.Indicator>
            <Stepper.Icon>
              <LockOpenFill height={24} width={24} />
            </Stepper.Icon>
          </Stepper.Indicator>
          <Stepper.Content>
            <Stepper.Title>Today</Stepper.Title>
            <Stepper.Description>
              Get instant access to all premium features, no credit card
              required.
            </Stepper.Description>
          </Stepper.Content>
          <Stepper.Separator />
        </Stepper.Step>

        <Stepper.Step>
          <Stepper.Indicator>
            <Stepper.Icon>
              <BellFill height={24} width={24} />
            </Stepper.Icon>
          </Stepper.Indicator>
          <Stepper.Content>
            <Stepper.Title>In 12 days</Stepper.Title>
            <Stepper.Description>
              We&apos;ll send you a friendly reminder that your trial is
              wrapping up.
            </Stepper.Description>
          </Stepper.Content>
          <Stepper.Separator />
        </Stepper.Step>

        <Stepper.Step>
          <Stepper.Indicator>
            <Stepper.Icon>
              <Calendar height={24} width={24} />
            </Stepper.Icon>
          </Stepper.Indicator>
          <Stepper.Content>
            <Stepper.Title>In 14 days</Stepper.Title>
            <Stepper.Description>
              Your plan activates automatically. Cancel anytime before — no
              questions asked.
            </Stepper.Description>
          </Stepper.Content>
        </Stepper.Step>
      </Stepper>
    </div>
  )
}
