// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartLine,
  Flag,
  Globe,
  Megaphone,
  Persons,
  ShieldCheck
} from '@gravity-ui/icons'

import { Timeline } from '@vezham/react-pro-v3'
import { Chip, Link } from '@vezham/react-v3'

const milestones = [
  {
    description:
      'Invited design partners to stress-test billing, permissions, and reporting workflows.',
    icon: Persons,
    metric: '24 teams',
    tag: 'Research',
    tagColor: 'default',
    time: 'Jan 2026',
    title: 'Private beta'
  },
  {
    description:
      'Metered plans went live for sandbox workspaces after invoice previews cleared review.',
    icon: ChartLine,
    metric: '3 plans',
    tag: 'Billing',
    tagColor: 'accent',
    time: 'Mar 2026',
    title: 'Usage-based pricing'
  },
  {
    description: (
      <>
        Opened the EU data boundary with local support coverage and a{' '}
        <Link className="text-xs" href="#">
          launch brief
        </Link>
        .
      </>
    ),
    icon: Globe,
    metric: '2 regions',
    tag: 'Expansion',
    tagColor: 'success',
    time: 'May 2026',
    title: 'Regional launch'
  },
  {
    description:
      'First integrations shipped with shared certification notes and co-marketing assets.',
    icon: Flag,
    metric: '8 partners',
    tag: 'Marketplace',
    tagColor: 'warning',
    time: 'Aug 2026',
    title: 'Partner network'
  },
  {
    description:
      'Audit logs, SSO handoff, and incident exports were bundled into the admin rollout.',
    icon: ShieldCheck,
    metric: '5 controls',
    tag: 'Governance',
    tagColor: 'default',
    time: 'Oct 2026',
    title: 'Enterprise controls'
  },
  {
    description:
      'Customer education, lifecycle emails, and release notes moved into one launch calendar.',
    icon: Megaphone,
    metric: '12 touchpoints',
    tag: 'Adoption',
    tagColor: 'accent',
    time: 'Dec 2026',
    title: 'Scale motion'
  }
] as const

type Milestone = (typeof milestones)[number]

function MilestoneBody({
  milestone,
  order = 'time-first'
}: {
  milestone: Milestone
  order?: 'tag-first' | 'time-first'
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {order === 'tag-first' ? (
          <>
            <Chip color={milestone.tagColor} size="sm" variant="soft">
              {milestone.tag}
            </Chip>
            <time className="text-muted text-xs leading-5">
              {milestone.time}
            </time>
          </>
        ) : (
          <>
            <time className="text-muted text-xs leading-5">
              {milestone.time}
            </time>
            <Chip color={milestone.tagColor} size="sm" variant="soft">
              {milestone.tag}
            </Chip>
          </>
        )}
      </div>
      <h3 className="text-foreground m-0 text-sm leading-5 font-medium">
        {milestone.title}
      </h3>
      <p className="text-muted m-0 text-xs leading-5">
        {milestone.description}
      </p>
      <span className="text-muted text-xs leading-5">{milestone.metric}</span>
    </>
  )
}

export function CenteredMilestones() {
  return (
    <div className="w-full max-w-[700px] min-w-0 py-4">
      <div className="mb-5 flex items-center justify-center gap-3">
        <div className="bg-separator h-px flex-1" />
        <Chip color="accent" size="sm" variant="soft">
          2026 expansion
        </Chip>
        <div className="bg-separator h-px flex-1" />
      </div>

      <div className="sm:hidden">
        <Timeline density="compact" size="sm">
          {milestones.map(milestone => {
            const Icon = milestone.icon

            return (
              <Timeline.Item key={milestone.title}>
                <Timeline.Marker aria-hidden="true">
                  <Icon />
                </Timeline.Marker>
                <Timeline.Content className="gap-1.5">
                  <MilestoneBody milestone={milestone} />
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </div>

      <div className="hidden sm:block">
        <Timeline
          axis="center"
          itemAlign="center"
          placement="alternate"
          size="sm">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            const isStartSide = index % 2 === 1

            return (
              <Timeline.Item key={milestone.title}>
                <Timeline.Marker aria-hidden="true">
                  <Icon />
                </Timeline.Marker>
                <Timeline.Content className="max-w-[260px] gap-1.5">
                  <MilestoneBody
                    milestone={milestone}
                    order={isStartSide ? 'tag-first' : 'time-first'}
                  />
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </div>
    </div>
  )
}
