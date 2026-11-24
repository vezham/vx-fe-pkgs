// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import Box from '@gravity-ui/icons/Box'
import CircleFill from '@gravity-ui/icons/CircleFill'
import Copy from '@gravity-ui/icons/Copy'
import Headphones from '@gravity-ui/icons/Headphones'
import MapPin from '@gravity-ui/icons/MapPin'

import { Stepper } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

const trackingSteps = [
  {
    date: 'Mar 28, 10:45 AM',
    description: 'Payment verified successfully',
    title: 'Order Placed'
  },
  {
    date: 'Mar 29, 03:12 PM',
    description: 'Picked up from warehouse',
    title: 'Shipment Picked Up'
  },
  {
    date: 'Mar 31, 07:30 AM',
    description: 'Cleared customs in Leipzig, DE',
    title: 'In Transit'
  },
  { date: '--', description: 'Pending', title: 'Out for Delivery' },
  { date: '--', description: 'Pending', title: 'Delivered' }
]

function TrackingIndicator() {
  const { status } = Stepper.useStep()

  if (status === 'active') {
    return (
      <Stepper.Indicator>
        <Stepper.Icon>
          <CircleFill />
        </Stepper.Icon>
      </Stepper.Indicator>
    )
  }

  if (status === 'inactive') {
    return (
      <Stepper.Indicator>
        <></>
      </Stepper.Indicator>
    )
  }

  return <Stepper.Indicator />
}

function TrackingDate({ date }: { date: string }) {
  const { status } = Stepper.useStep()
  const isActive = status === 'active'

  return (
    <span
      className={`shrink-0 text-right text-[11px] whitespace-nowrap ${isActive ? 'font-medium' : 'text-muted'}`}
      style={isActive ? { color: 'var(--stepper-active-color)' } : undefined}>
      {date}
    </span>
  )
}

function TrackingTitle({ children }: { children: React.ReactNode }) {
  const { status } = Stepper.useStep()

  return (
    <Stepper.Title
      style={
        status === 'active'
          ? { color: 'var(--stepper-active-color)' }
          : undefined
      }>
      {children}
    </Stepper.Title>
  )
}

export function PackageTracking() {
  return (
    <div className="bg-surface shadow-surface w-[420px] rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted text-xs font-medium tracking-wide">
          Order #DHL-472891
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          style={{
            backgroundColor:
              'color-mix(in oklch, var(--color-accent) 12%, transparent)',
            color: 'var(--color-accent)'
          }}>
          In Transit
        </span>
      </div>

      <h2 className="text-foreground text-[22px] leading-tight font-bold">
        Arriving Wednesday
      </h2>
      <p className="text-muted mb-5 text-sm">Estimated delivery by 6:00 PM</p>

      <div className="bg-surface-secondary mb-6 flex items-center gap-3 rounded-xl px-3.5 py-3">
        <div className="bg-surface text-muted flex size-10 items-center justify-center rounded-lg">
          <Box />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-foreground text-sm font-semibold">
            DHL Express
          </span>
          <span className="text-muted text-xs">TRK: 1Z 849 FL2 0347</span>
        </div>
        <Button
          isIconOnly
          aria-label="Copy tracking number"
          className="text-muted"
          size="sm"
          variant="ghost">
          <Copy />
        </Button>
      </div>

      <Stepper
        className="px-1"
        currentStep={2.4}
        orientation="vertical"
        size="md">
        {trackingSteps.map(step => (
          <Stepper.Step key={step.title}>
            <TrackingIndicator />
            <Stepper.Content className="flex-1">
              <TrackingTitle>{step.title}</TrackingTitle>
              <Stepper.Description>{step.description}</Stepper.Description>
            </Stepper.Content>
            <TrackingDate date={step.date} />
            <Stepper.Separator />
          </Stepper.Step>
        ))}
      </Stepper>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1" size="sm">
          <MapPin />
          Live Map Tracking
        </Button>
        <Button className="flex-1" size="sm" variant="outline">
          <Headphones />
          Support
        </Button>
      </div>
    </div>
  )
}
