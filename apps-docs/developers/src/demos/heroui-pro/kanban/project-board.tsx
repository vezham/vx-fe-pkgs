// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Ellipsis, Plus } from '@gravity-ui/icons'

import type { UseKanbanReturn } from '@vezham/react-pro-v3/kanban'
import { Kanban } from '@vezham/react-pro-v3/kanban'
import { useKanban, useKanbanColumn } from '@vezham/react-pro-v3/kanban'
import { Avatar, Button, ProgressBar } from '@vezham/react-v3'

interface ProjectTask {
  assignees: Array<{ avatar: string; name: string }>
  category: string
  categoryColor: string
  dueDate?: string
  id: string
  status: string
  subtasksCompleted?: number
  subtasksTotal?: number
  title: string
}

const avatars = {
  alex: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
  emily:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/white.jpg',
  jake: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg',
  maria:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
  sam: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
  sarah:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg'
}

const projectTasks: ProjectTask[] = [
  {
    assignees: [{ avatar: avatars.sam, name: 'Sam' }],
    category: 'Research',
    categoryColor: '#8b5cf6',
    id: 'p1',
    status: 'Backlog',
    title: 'Research competitor onboarding patterns'
  },
  {
    assignees: [{ avatar: avatars.alex, name: 'Alex' }],
    category: 'Engineering',
    categoryColor: '#3b82f6',
    id: 'p2',
    status: 'Backlog',
    title: 'Audit analytics event naming'
  },
  {
    assignees: [
      { avatar: avatars.emily, name: 'Emily' },
      { avatar: avatars.maria, name: 'Maria' }
    ],
    category: 'UX',
    categoryColor: '#ef4444',
    dueDate: 'Jun 18',
    id: 'p3',
    status: 'To Do',
    title: 'Design empty states for dashboard widgets'
  },
  {
    assignees: [
      { avatar: avatars.jake, name: 'Jake' },
      { avatar: avatars.sarah, name: 'Sarah' }
    ],
    category: 'Engineering',
    categoryColor: '#3b82f6',
    dueDate: 'Jun 20',
    id: 'p4',
    status: 'To Do',
    title: 'Set up CI/CD for staging environment'
  },
  {
    assignees: [{ avatar: avatars.maria, name: 'Maria' }],
    category: 'UX',
    categoryColor: '#ef4444',
    dueDate: 'Jun 15',
    id: 'p5',
    status: 'In Progress',
    subtasksCompleted: 3,
    subtasksTotal: 7,
    title: 'Redesign onboarding flow'
  },
  {
    assignees: [{ avatar: avatars.jake, name: 'Jake' }],
    category: 'Engineering',
    categoryColor: '#3b82f6',
    id: 'p6',
    status: 'In Progress',
    subtasksCompleted: 3,
    subtasksTotal: 5,
    title: 'API rate limiting implementation'
  },
  {
    assignees: [{ avatar: avatars.sam, name: 'Sam' }],
    category: 'Research',
    categoryColor: '#8b5cf6',
    id: 'p7',
    status: 'In Progress',
    title: 'Create user interview script for v2.5'
  },
  {
    assignees: [
      { avatar: avatars.sarah, name: 'Sarah' },
      { avatar: avatars.emily, name: 'Emily' }
    ],
    category: 'UX',
    categoryColor: '#ef4444',
    id: 'p8',
    status: 'In Review',
    title: 'Push notification permission flow'
  },
  {
    assignees: [
      { avatar: avatars.jake, name: 'Jake' },
      { avatar: avatars.alex, name: 'Alex' },
      { avatar: avatars.maria, name: 'Maria' }
    ],
    category: 'Engineering',
    categoryColor: '#3b82f6',
    id: 'p9',
    status: 'In Review',
    title: 'Database migration script for v2.4'
  },
  {
    assignees: [{ avatar: avatars.sam, name: 'Sam' }],
    category: 'Docs',
    categoryColor: '#06b6d4',
    id: 'p10',
    status: 'In Review',
    title: 'Write release notes for v2.4'
  },
  {
    assignees: [{ avatar: avatars.maria, name: 'Maria' }],
    category: 'Engineering',
    categoryColor: '#3b82f6',
    id: 'p11',
    status: 'Done',
    title: 'Implement dark mode toggle'
  },
  {
    assignees: [
      { avatar: avatars.emily, name: 'Emily' },
      { avatar: avatars.sarah, name: 'Sarah' }
    ],
    category: 'Engineering',
    categoryColor: '#3b82f6',
    id: 'p12',
    status: 'Done',
    title: 'Fix pagination bug on search results'
  },
  {
    assignees: [{ avatar: avatars.alex, name: 'Alex' }],
    category: 'UX',
    categoryColor: '#ef4444',
    id: 'p13',
    status: 'Done',
    title: 'Add skeleton loaders to dashboard'
  }
]

const columnMeta: Record<string, string> = {
  Backlog: 'bg-default',
  Done: 'bg-success',
  'In Progress': 'bg-warning',
  'In Review': 'bg-danger',
  'To Do': 'bg-accent'
}

const projectColumns = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done']

function ProjectColumn({
  column,
  kanban
}: {
  column: string
  kanban: UseKanbanReturn<ProjectTask>
}) {
  const { dragAndDropHooks, items } = useKanbanColumn(kanban, column)

  return (
    <Kanban.Column>
      <Kanban.ColumnHeader>
        <Kanban.ColumnIndicator
          className={columnMeta[column] ?? 'bg-default'}
        />
        <Kanban.ColumnTitle>{column}</Kanban.ColumnTitle>
        <Kanban.ColumnCount>{items.length}</Kanban.ColumnCount>
        <Kanban.ColumnActions>
          <Button isIconOnly aria-label="Add task" size="sm" variant="ghost">
            <Plus />
          </Button>
          <Button
            isIconOnly
            aria-label="More options"
            size="sm"
            variant="ghost">
            <Ellipsis />
          </Button>
        </Kanban.ColumnActions>
      </Kanban.ColumnHeader>
      <Kanban.ColumnBody>
        <Kanban.ScrollShadow className="max-h-[480px]">
          <Kanban.CardList
            aria-label={column}
            dragAndDropHooks={dragAndDropHooks}
            items={items}
            renderEmptyState={() => 'No tasks.'}>
            {task => (
              <Kanban.Card textValue={task.title}>
                <span
                  className={`text-foreground leading-snug font-semibold ${column === 'Done' ? 'line-through opacity-60' : ''}`}>
                  {task.title}
                </span>

                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: task.categoryColor }}
                  />
                  <span className="text-muted text-xs">{task.category}</span>
                </span>

                {task.subtasksTotal != null && (
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      aria-label="Subtasks"
                      className="flex-1"
                      color="accent"
                      size="sm"
                      value={
                        (task.subtasksCompleted! / task.subtasksTotal) * 100
                      }>
                      <ProgressBar.Track>
                        <ProgressBar.Fill />
                      </ProgressBar.Track>
                    </ProgressBar>
                    <span className="text-muted text-xs tabular-nums">
                      {task.subtasksCompleted}/{task.subtasksTotal}
                    </span>
                  </div>
                )}

                <div className="mt-0.5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {task.assignees.slice(0, 3).map(a => (
                      <Avatar
                        key={a.name}
                        className="ring-background size-5 ring-2"
                        size="sm">
                        <Avatar.Image alt={a.name} src={a.avatar} />
                        <Avatar.Fallback>{a.name[0]}</Avatar.Fallback>
                      </Avatar>
                    ))}
                    {task.assignees.length > 3 && (
                      <Avatar
                        className="ring-background size-5 ring-2"
                        size="sm">
                        <Avatar.Fallback className="text-xs">
                          +{task.assignees.length - 3}
                        </Avatar.Fallback>
                      </Avatar>
                    )}
                  </div>
                  {!!task.dueDate && (
                    <span className="text-muted text-xs">{task.dueDate}</span>
                  )}
                </div>
              </Kanban.Card>
            )}
          </Kanban.CardList>
        </Kanban.ScrollShadow>
      </Kanban.ColumnBody>
    </Kanban.Column>
  )
}

export function ProjectBoard() {
  const kanban = useKanban<ProjectTask>({
    getColumn: item => item.status,
    initialItems: projectTasks,
    setColumn: (item, column) => ({ ...item, status: column })
  })

  return (
    <Kanban>
      {projectColumns.map(col => (
        <ProjectColumn key={col} column={col} kanban={kanban} />
      ))}
    </Kanban>
  )
}
