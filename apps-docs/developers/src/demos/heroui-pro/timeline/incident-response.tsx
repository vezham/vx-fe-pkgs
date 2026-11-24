// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleCheckFill,
  Clock,
  Comment,
  Envelope,
  FileText,
  Person,
  ThunderboltFill
} from '@gravity-ui/icons'

import { Timeline } from '@vezham/react-pro-v3'
import { Avatar, Button, Card, Chip, Input, Link } from '@vezham/react-v3'

const avatars = {
  blue: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
  green:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
  orange:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg'
} as const

const activityEvents = [
  {
    actor: 'Kaito Reed',
    avatar: avatars.orange,
    icon: ThunderboltFill,
    prefix: 'Escalation acknowledged by',
    status: 'warning',
    time: '2:24 AM'
  },
  {
    actor: 'Mira Stone',
    avatar: avatars.green,
    icon: Person,
    prefix: 'Incident channel joined by',
    status: 'default',
    time: '2:23 AM'
  },
  {
    icon: Envelope,
    recipient: 'finance-ops',
    status: 'default',
    text: 'Customer update sent to',
    time: '2:21 AM'
  },
  {
    icon: CircleCheckFill,
    status: 'success',
    target: 'export-worker-3',
    text: 'Mitigation deployed to',
    time: '2:18 AM'
  },
  {
    icon: Clock,
    status: 'muted',
    text: 'Postmortem reminder',
    time: '2:14 AM',
    trailingText: 'scheduled'
  }
] as const

export function IncidentResponse() {
  return (
    <div className="mx-auto w-[calc(100%-2rem)] max-w-[720px] min-w-0 sm:w-full">
      <div className="mb-5">
        <p className="text-muted m-0 text-xs font-medium">Incident response</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Export queue degradation
        </h3>
      </div>

      <Timeline density="compact" size="sm">
        <Timeline.Item align="center">
          <Timeline.Rail className="items-center">
            <Timeline.Marker
              aria-hidden="true"
              className="size-7 overflow-hidden border-0 p-0 shadow-none">
              <Avatar className="size-full" size="lg">
                <Avatar.Image alt="Nora Vazquez" src={avatars.blue} />
                <Avatar.Fallback>NV</Avatar.Fallback>
              </Avatar>
            </Timeline.Marker>
            <Timeline.Connector className="top-[calc(50%+var(--spacing)*3.5)]" />
          </Timeline.Rail>
          <Timeline.Content>
            <div className="flex items-center gap-2 sm:gap-3">
              <Input
                aria-label="Add incident update"
                className="min-w-0 flex-1"
                defaultValue="Queue depth is falling after the worker pool restart."
                variant="secondary"
              />
              <Button className="shrink-0" size="sm" type="button">
                Post
              </Button>
            </div>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item status="current">
          <Timeline.Marker aria-hidden="true">
            <Comment />
          </Timeline.Marker>
          <Timeline.Content className="gap-2.5">
            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="text-muted text-xs leading-5">
                  Update from
                </span>
                <Avatar className="size-4" size="sm">
                  <Avatar.Image alt="Nora Vazquez" src={avatars.blue} />
                  <Avatar.Fallback>NV</Avatar.Fallback>
                </Avatar>
                <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                  Nora Vazquez
                </h3>
                <Chip size="sm" variant="soft">
                  On-call
                </Chip>
              </div>
              <time className="text-muted shrink-0 text-xs leading-5">
                2:28 AM
              </time>
            </div>

            <Card
              className="!border-border w-full !border !border-solid p-3"
              variant="transparent">
              <p className="text-foreground m-0 text-sm leading-relaxed">
                Confirmed the delay is isolated to scheduled exports. API
                requests and dashboard reads are healthy while the backlog
                drains.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Chip size="sm" variant="secondary">
                  <FileText width={12} />
                  <Chip.Label>worker-trace.har - 42 KB</Chip.Label>
                </Chip>
                <Link className="text-xs" href="#">
                  Open runbook
                  <Link.Icon />
                </Link>
              </div>
            </Card>
          </Timeline.Content>
        </Timeline.Item>

        {activityEvents.map(event => {
          const Icon = event.icon

          return (
            <Timeline.Item
              key={`${'prefix' in event ? event.prefix : event.text}-${event.time}`}
              align="center"
              status={event.status}>
              <Timeline.Marker aria-hidden="true">
                <Icon />
              </Timeline.Marker>
              <Timeline.Content>
                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p className="text-muted m-0 min-w-0 text-xs leading-5">
                    {'actor' in event ? (
                      <>
                        {event.prefix}{' '}
                        <span className="inline-flex align-middle whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Avatar className="size-4" size="sm">
                              <Avatar.Image
                                alt={event.actor}
                                src={event.avatar}
                              />
                              <Avatar.Fallback>
                                {event.actor
                                  .split(' ')
                                  .map(part => part[0])
                                  .join('')}
                              </Avatar.Fallback>
                            </Avatar>
                            <span className="text-foreground font-medium">
                              {event.actor}
                            </span>
                          </span>
                        </span>
                      </>
                    ) : 'recipient' in event ? (
                      <>
                        {event.text}{' '}
                        <Link className="truncate text-xs" href="#">
                          {event.recipient}
                        </Link>
                      </>
                    ) : 'trailingText' in event ? (
                      <>
                        <span className="text-foreground font-medium">
                          {event.text}
                        </span>{' '}
                        {event.trailingText}
                      </>
                    ) : 'target' in event ? (
                      <>
                        {event.text}{' '}
                        <span className="text-foreground font-medium">
                          {event.target}
                        </span>
                      </>
                    ) : null}
                  </p>
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
