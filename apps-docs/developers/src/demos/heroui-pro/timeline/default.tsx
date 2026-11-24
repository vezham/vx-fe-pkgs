// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartLine,
  CircleCheckFill,
  Clock,
  Flag,
  Megaphone,
  ShieldExclamation
} from '@gravity-ui/icons'

import { Timeline } from '@vezham/react-pro-v3'
import { Chip, Link } from '@vezham/react-v3'

const rolloutEvents = [
  {
    description: (
      <>
        Created{' '}
        <span className="text-foreground font-medium">checkout-redesign</span>{' '}
        for the billing workspace.
      </>
    ),
    icon: Flag,
    meta: 'Owner assigned',
    status: 'default',
    time: '09:12',
    title: 'Feature flag created'
  },
  {
    description: (
      <>
        Enabled for{' '}
        <span className="text-foreground font-medium">5% of workspaces</span>{' '}
        with session replay sampling on.
      </>
    ),
    icon: ChartLine,
    meta: 'Canary',
    metaColor: 'accent',
    status: 'current',
    time: '09:34',
    title: 'Canary rollout started'
  },
  {
    description: (
      <>
        Latency climbed in{' '}
        <span className="text-foreground font-medium">eu-central-1</span>;
        rollout is holding while routing warms.
      </>
    ),
    icon: ShieldExclamation,
    meta: 'Paused',
    metaColor: 'warning',
    status: 'warning',
    time: '09:51',
    title: 'Regional guardrail tripped'
  },
  {
    description: (
      <>
        Support macro and changelog draft are ready in{' '}
        <Link className="text-xs" href="#">
          Launch notes
        </Link>
        .
      </>
    ),
    icon: Megaphone,
    meta: 'Docs',
    status: 'default',
    time: '10:05',
    title: 'Customer messaging prepared'
  },
  {
    description: 'Full rollout waits for the next error-budget sweep.',
    icon: Clock,
    meta: 'Queued',
    status: 'muted',
    time: '10:30',
    title: 'Launch window scheduled'
  },
  {
    description: (
      <>
        Rollback owner and dashboard checks are recorded in the release audit.
      </>
    ),
    icon: CircleCheckFill,
    meta: 'Ready',
    metaColor: 'success',
    status: 'success',
    time: '10:42',
    title: 'Release checklist verified'
  }
] as const

export function Default() {
  return (
    <div className="w-full max-w-[560px] min-w-0">
      <div className="mb-4">
        <p className="text-muted m-0 text-xs font-medium">Rollout audit</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Checkout redesign
        </h3>
      </div>

      <Timeline density="compact" size="sm">
        {rolloutEvents.map(event => {
          const Icon = event.icon

          return (
            <Timeline.Item
              key={event.title}
              align="center"
              status={event.status}>
              <Timeline.Marker aria-hidden="true">
                <Icon />
              </Timeline.Marker>
              <Timeline.Content>
                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                        {event.title}
                      </h3>
                      <Chip
                        color={
                          'metaColor' in event ? event.metaColor : 'default'
                        }
                        size="sm"
                        variant="soft">
                        {event.meta}
                      </Chip>
                    </div>
                    <p className="text-muted m-0 mt-1 text-xs leading-5">
                      {event.description}
                    </p>
                  </div>
                  <time className="text-muted shrink-0 text-xs leading-5">
                    {event.time}
                  </time>
                </div>
              </Timeline.Content>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </div>
  )
}
