// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Timeline } from '@vezham/react-pro-v3'
import { Avatar, Card, Chip, CloseButton } from '@vezham/react-v3'

const authors = {
  eli: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    name: 'Eli Wong'
  },
  maya: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    name: 'Maya Chen'
  },
  nora: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    name: 'Nora Vazquez'
  }
} as const

const revisions = [
  {
    author: authors.maya,
    label: 'Draft',
    labelColor: 'accent',
    status: 'current',
    summary:
      'Prepared billing copy, tax preview states, and the final approval checklist.',
    time: 'Current',
    title: 'v8'
  },
  {
    author: authors.nora,
    label: 'Live',
    labelColor: 'success',
    status: 'success',
    summary:
      'Published the pricing table refresh after support macros cleared review.',
    time: 'May 22, 2026, 11:18 AM',
    title: 'v7'
  },
  {
    author: authors.eli,
    status: 'default',
    summary:
      'Added regional tax notes and restored the upgrade confirmation banner.',
    time: 'May 21, 2026, 04:42 PM',
    title: 'v6'
  },
  {
    author: authors.maya,
    status: 'muted',
    summary: 'Reworked mobile spacing for plan cards and invoice preview rows.',
    time: 'May 20, 2026, 09:06 AM',
    title: 'v5'
  },
  {
    author: authors.nora,
    status: 'muted',
    summary:
      'Imported partner terms and archived the legacy enterprise copy block.',
    time: 'May 18, 2026, 02:31 PM',
    title: 'v4'
  },
  {
    author: authors.eli,
    status: 'muted',
    summary:
      'Captured the first internal draft from the launch planning workspace.',
    time: 'May 16, 2026, 10:14 AM',
    title: 'v3'
  }
] as const

export function DocumentRevisions() {
  return (
    <Card className="w-full max-w-[420px] gap-0 overflow-hidden p-0">
      <Card.Header className="border-border flex-row items-center justify-between border-b px-5 py-4">
        <h3 className="text-foreground m-0 text-base font-semibold">
          Version history
        </h3>
        <CloseButton aria-label="Close revision history" />
      </Card.Header>

      <Card.Content className="px-5 py-4">
        <Timeline density="compact" size="sm">
          {revisions.map(revision => (
            <Timeline.Item key={revision.title} status={revision.status}>
              <Timeline.Marker />
              <Timeline.Content className="gap-1.5">
                <div className="flex min-h-5 min-w-0 items-center gap-2">
                  <h4 className="text-foreground m-0 text-xs leading-tight font-medium">
                    {revision.title}
                  </h4>
                  {'label' in revision ? (
                    <Chip color={revision.labelColor} size="sm" variant="soft">
                      {revision.label}
                    </Chip>
                  ) : null}
                </div>
                <p className="text-muted m-0 text-xs leading-5">
                  {revision.summary}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="size-4" size="sm">
                    <Avatar.Image
                      alt={revision.author.name}
                      src={revision.author.avatar}
                    />
                    <Avatar.Fallback>
                      {revision.author.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-muted text-xs leading-5">
                    {revision.author.name}
                  </span>
                  <span className="text-muted text-xs leading-5">-</span>
                  <time className="text-muted text-xs leading-5">
                    {revision.time}
                  </time>
                </div>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card.Content>
    </Card>
  )
}
