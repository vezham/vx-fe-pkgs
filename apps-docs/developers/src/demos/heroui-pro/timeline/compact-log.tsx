// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleCheck,
  CreditCard,
  Receipt,
  ShieldExclamation
} from '@gravity-ui/icons'

import { Timeline } from '@vezham/react-pro-v3'

const logEvents = [
  {
    description:
      'The customer disputed a renewal charge, and the finance team has seven days to submit evidence.',
    icon: ShieldExclamation,
    status: 'warning',
    time: 'Mar 6, 10:34 AM',
    title: 'Chargeback case opened'
  },
  {
    icon: CreditCard,
    status: 'success',
    time: 'Mar 6, 10:21 AM',
    title: 'Payment captured'
  },
  {
    icon: CircleCheck,
    status: 'default',
    time: 'Mar 6, 10:21 AM',
    title: 'Payment authorized'
  },
  {
    icon: Receipt,
    status: 'muted',
    time: 'Mar 6, 10:20 AM',
    title: 'Invoice generated'
  }
] as const

export function CompactLog() {
  return (
    <div className="box-border w-full max-w-[520px] min-w-0 px-2 sm:px-0">
      <Timeline density="compact" size="sm">
        {logEvents.map(event => {
          const Icon = event.icon
          const hasDescription = 'description' in event

          return (
            <Timeline.Item
              key={event.title}
              align={hasDescription ? 'start' : 'center'}
              status={event.status}>
              <Timeline.Marker aria-hidden="true">
                <Icon />
              </Timeline.Marker>
              <Timeline.Content className="gap-1">
                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <h3 className="text-foreground m-0 text-xs leading-tight font-medium">
                    {event.title}
                  </h3>
                  <time className="text-muted shrink-0 text-xs leading-tight">
                    {event.time}
                  </time>
                </div>
                {hasDescription ? (
                  <p className="text-muted m-0 text-xs leading-snug">
                    {event.description}
                  </p>
                ) : null}
              </Timeline.Content>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </div>
  )
}
