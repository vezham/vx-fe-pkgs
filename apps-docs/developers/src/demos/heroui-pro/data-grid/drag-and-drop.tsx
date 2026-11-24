// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import type { DataGridColumn, DataGridReorderEvent } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { Chip } from '@vezham/react-v3'

interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
  status: 'todo' | 'in-progress' | 'done'
}

const initialTasks: Task[] = [
  {
    assignee: 'Olivia',
    id: 'task-1',
    priority: 'high',
    status: 'in-progress',
    title: 'Design system audit'
  },
  {
    assignee: 'Jackson',
    id: 'task-2',
    priority: 'high',
    status: 'todo',
    title: 'API rate limiting'
  },
  {
    assignee: 'Isabella',
    id: 'task-3',
    priority: 'medium',
    status: 'in-progress',
    title: 'Onboarding flow redesign'
  },
  {
    assignee: 'William',
    id: 'task-4',
    priority: 'high',
    status: 'todo',
    title: 'Database migration script'
  },
  {
    assignee: 'Sofia',
    id: 'task-5',
    priority: 'low',
    status: 'done',
    title: 'Unit test coverage report'
  },
  {
    assignee: 'Liam',
    id: 'task-6',
    priority: 'medium',
    status: 'todo',
    title: 'Performance profiling'
  },
  {
    assignee: 'Emma',
    id: 'task-7',
    priority: 'medium',
    status: 'in-progress',
    title: 'Accessibility audit'
  },
  {
    assignee: 'Noah',
    id: 'task-8',
    priority: 'low',
    status: 'done',
    title: 'CI pipeline optimization'
  }
]

const priorityColorMap: Record<
  Task['priority'],
  'danger' | 'warning' | 'default'
> = {
  high: 'danger',
  low: 'default',
  medium: 'warning'
}

const statusColorMap: Record<
  Task['status'],
  'success' | 'warning' | 'default'
> = {
  done: 'success',
  'in-progress': 'warning',
  todo: 'default'
}

const statusLabelMap: Record<Task['status'], string> = {
  done: 'Done',
  'in-progress': 'In Progress',
  todo: 'To Do'
}

export function DragAndDrop() {
  const [tasks, setTasks] = useState(initialTasks)

  const columns: DataGridColumn<Task>[] = [
    {
      accessorKey: 'title',
      header: 'Task',
      id: 'title',
      isRowHeader: true
    },
    {
      accessorKey: 'priority',
      cell: item => (
        <Chip color={priorityColorMap[item.priority]} size="sm" variant="soft">
          <Chip.Label className="capitalize">{item.priority}</Chip.Label>
        </Chip>
      ),
      header: 'Priority',
      id: 'priority'
    },
    {
      accessorKey: 'assignee',
      header: 'Assignee',
      id: 'assignee'
    },
    {
      accessorKey: 'status',
      cell: item => (
        <Chip color={statusColorMap[item.status]} size="sm" variant="soft">
          <Chip.Label>{statusLabelMap[item.status]}</Chip.Label>
        </Chip>
      ),
      header: 'Status',
      id: 'status'
    }
  ]

  const handleReorder = (event: DataGridReorderEvent<Task>) => {
    setTasks(event.reorderedData)
  }

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <p className="text-muted text-sm">
        Drag rows to reorder. Use keyboard (Enter to grab, arrows to move, Enter
        to drop).
      </p>
      <DataGrid
        aria-label="Task backlog"
        columns={columns}
        data={tasks}
        getRowId={item => item.id}
        variant="primary"
        onReorder={handleReorder}
      />
    </div>
  )
}
