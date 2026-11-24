// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartLine,
  CircleCheckFill,
  Flag,
  Megaphone,
  ShieldCheck
} from '@gravity-ui/icons'

import { Timeline } from '@vezham/react-pro-v3'
import { Card, Chip, Link } from '@vezham/react-v3'

const launchReviews = [
  {
    description: (
      <>
        Invoice copy, empty states, and seat-change messages passed the{' '}
        <Link className="text-xs" href="#">
          annotation review
        </Link>
        .
      </>
    ),
    icon: Flag,
    lane: 'Design',
    laneColor: 'default',
    metrics: [
      { label: 'Screens', value: '18' },
      { label: 'Open notes', value: '2' }
    ],
    owner: 'Nina Park',
    status: 'default',
    time: '09:15',
    title: 'Checkout language approved'
  },
  {
    description:
      'Fraud review added a manual hold rule for high-value upgrades during the first rollout window.',
    icon: ShieldCheck,
    lane: 'Risk',
    laneColor: 'warning',
    metrics: [
      { label: 'Threshold', value: '$750' },
      { label: 'Review SLA', value: '4 h' }
    ],
    owner: 'Omar Lee',
    status: 'warning',
    time: '10:40',
    title: 'Upgrade holds confirmed'
  },
  {
    description:
      'Billing telemetry is flowing into the release dashboard with workspace and plan dimensions.',
    icon: ChartLine,
    lane: 'Data',
    laneColor: 'accent',
    metrics: [
      { label: 'Events', value: '12' },
      { label: 'Lag', value: '42 s' }
    ],
    owner: 'Maya Hart',
    status: 'default',
    time: '12:05',
    title: 'Metrics dashboard connected'
  },
  {
    description:
      'Support macros, changelog copy, and escalation routing are scheduled for the release window.',
    icon: Megaphone,
    lane: 'Ops',
    laneColor: 'default',
    metrics: [
      { label: 'Macros', value: '6' },
      { label: 'Regions', value: '3' }
    ],
    owner: 'Priya Shah',
    status: 'default',
    time: '13:30',
    title: 'Customer messaging staged'
  },
  {
    description:
      'The rollback owner, dashboard links, and launch channel are pinned for the final go-live check.',
    icon: CircleCheckFill,
    lane: 'Launch',
    laneColor: 'success',
    metrics: [
      { label: 'Checks', value: '9/9' },
      { label: 'Window', value: '15 min' }
    ],
    owner: 'Eli Wong',
    status: 'success',
    time: '15:00',
    title: 'Release checklist signed'
  }
] as const

export function SplitContent() {
  return (
    <div className="w-full max-w-[680px] min-w-0 py-4">
      <div className="mx-auto mb-5 max-w-[360px] text-center">
        <p className="text-muted m-0 text-xs font-medium">Launch review</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Billing rollout
        </h3>
      </div>

      <Timeline axis="center" placement="end" size="sm">
        {launchReviews.map(review => {
          const Icon = review.icon

          return (
            <Timeline.Item key={review.title} status={review.status}>
              <Timeline.Content className="max-w-[180px] gap-1.5" side="start">
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <time className="text-foreground text-xs leading-5 font-medium">
                    {review.time}
                  </time>
                  <Chip color={review.laneColor} size="sm" variant="soft">
                    {review.lane}
                  </Chip>
                </div>
                <span className="text-muted text-xs leading-5">
                  {review.owner}
                </span>
              </Timeline.Content>
              <Timeline.Marker aria-hidden="true">
                <Icon />
              </Timeline.Marker>
              <Timeline.Content className="max-w-[320px] gap-2" side="end">
                <h3 className="text-foreground m-0 text-sm leading-5 font-medium">
                  {review.title}
                </h3>

                <Card
                  className="!border-border w-full !border !border-solid p-3"
                  variant="transparent">
                  <p className="text-muted m-0 text-xs leading-5">
                    {review.description}
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {review.metrics.map(metric => (
                      <div key={metric.label} className="min-w-0">
                        <span className="text-muted block text-[11px] leading-4">
                          {metric.label}
                        </span>
                        <span className="text-foreground block truncate text-xs leading-5 font-medium">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Timeline.Content>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </div>
  )
}
