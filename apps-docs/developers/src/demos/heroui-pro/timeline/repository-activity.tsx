// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CirclePlus,
  CodeCommits,
  CodePullRequest,
  CodePullRequestCheck,
  Eye
} from '@gravity-ui/icons'

import { Timeline } from '@vezham/react-pro-v3'
import { Card, Chip, Link } from '@vezham/react-v3'

const repositoryActivity = [
  {
    actor: 'Rina Sol',
    icon: CodeCommits,
    repositories: [
      { commits: '126 commits', name: 'lumenforge/interface' },
      { commits: '32 commits', name: 'mistral-bench/checkout' },
      { commits: '18 commits', name: 'pixelwell/cli' },
      { commits: '7 commits', name: 'signalnest/webhooks' }
    ],
    status: 'success',
    title: 'Committed across 4 product workspaces'
  },
  {
    actor: 'Theo Park',
    date: 'May 19',
    icon: CodePullRequest,
    pullRequest: {
      comments: '8 comments',
      description:
        'Reworked focus rings, empty states, and column resize handles for audit tables.',
      title: 'Tighten keyboard states in reporting grids'
    },
    status: 'current',
    title: 'Merged a pull request in lumenforge/interface'
  },
  {
    actor: 'Iris Moon',
    icon: CirclePlus,
    repositories: [
      { commits: '16 triaged', name: 'lumenforge/interface' },
      { commits: '9 resolved', name: 'pixelwell/cli' },
      { commits: '6 open', name: 'signalnest/webhooks' }
    ],
    status: 'warning',
    title: 'Opened 31 issues across 3 workspaces'
  },
  {
    actor: 'Mara Voss',
    date: 'May 28',
    icon: Eye,
    repositories: [
      { commits: '24 reviews', name: 'lumenforge/interface' },
      { commits: '13 reviews', name: 'mistral-bench/checkout' },
      { commits: '9 reviews', name: 'pixelwell/cli' },
      { commits: '5 reviews', name: 'signalnest/webhooks' }
    ],
    status: 'default',
    title: 'Reviewed 51 pull requests in 4 workspaces'
  }
] as const

export function RepositoryActivity() {
  return (
    <div className="w-full max-w-[620px] min-w-0">
      <div className="mb-4 flex items-center gap-4">
        <h3 className="text-foreground m-0 shrink-0 text-sm font-semibold">
          May 2026
        </h3>
        <div className="bg-separator h-px flex-1" />
      </div>

      <Timeline size="sm">
        {repositoryActivity.map(event => {
          const Icon = event.icon

          return (
            <Timeline.Item key={event.title} status={event.status}>
              <Timeline.Marker aria-hidden="true">
                <Icon />
              </Timeline.Marker>
              <Timeline.Content className="gap-2.5">
                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-foreground m-0 text-sm leading-5 font-medium">
                      {event.title}
                    </h3>
                    <p className="text-muted m-0 text-xs leading-5">
                      {event.actor}
                    </p>
                  </div>
                  {'date' in event ? (
                    <time className="text-muted shrink-0 text-xs leading-5">
                      {event.date}
                    </time>
                  ) : null}
                </div>

                {'repositories' in event ? (
                  <div className="grid gap-1">
                    {event.repositories.map(repository => (
                      <div
                        key={repository.name}
                        className="grid min-w-0 grid-cols-1 gap-0.5 sm:grid-cols-[minmax(0,200px)_auto] sm:items-center sm:gap-3">
                        <Link className="truncate text-xs" href="#">
                          {repository.name}
                        </Link>
                        <span className="text-muted text-xs">
                          {repository.commits}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {'pullRequest' in event ? (
                  <Card className="w-full min-w-0 p-3">
                    <Card.Header className="gap-2.5 p-0">
                      <CodePullRequestCheck className="text-accent size-4 shrink-0" />
                      <div className="min-w-0">
                        <Card.Title className="text-sm leading-5">
                          {event.pullRequest.title}
                        </Card.Title>
                        <Card.Description className="mt-1 text-xs leading-5">
                          {event.pullRequest.description}
                        </Card.Description>
                      </div>
                    </Card.Header>
                    <Card.Footer className="mt-3 flex flex-wrap items-center gap-2 p-0">
                      <Chip color="success" size="sm" variant="soft">
                        +18
                      </Chip>
                      <Chip color="danger" size="sm" variant="soft">
                        -4
                      </Chip>
                      <div
                        aria-hidden="true"
                        className="flex items-center gap-0.5">
                        <span className="bg-success size-2" />
                        <span className="bg-success size-2" />
                        <span className="bg-success size-2" />
                        <span className="bg-danger size-2" />
                        <span className="bg-separator size-2" />
                      </div>
                      <span className="text-muted text-xs">
                        - {event.pullRequest.comments}
                      </span>
                    </Card.Footer>
                  </Card>
                ) : null}

                {event.title.startsWith('Opened') ? (
                  <div className="flex flex-wrap gap-2">
                    <Chip color="success" size="sm" variant="soft">
                      16 triaged
                    </Chip>
                    <Chip color="accent" size="sm" variant="soft">
                      9 assigned
                    </Chip>
                    <Chip color="danger" size="sm" variant="soft">
                      6 open
                    </Chip>
                  </div>
                ) : null}
              </Timeline.Content>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </div>
  )
}
