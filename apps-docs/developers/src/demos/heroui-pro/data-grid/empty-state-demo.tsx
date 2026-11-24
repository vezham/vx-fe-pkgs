// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { FolderOpen, Plus } from '@gravity-ui/icons'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid, EmptyState } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

interface Project {
  id: number
  name: string
  owner: string
  updatedAt: string
  files: number
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const columns: DataGridColumn<Project>[] = [
  {
    accessorKey: 'name',
    cellClassName: 'font-medium',
    header: 'Project',
    id: 'name',
    isRowHeader: true
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    id: 'owner'
  },
  {
    accessorKey: 'files',
    align: 'center',
    cell: item => <span className="tabular-nums">{item.files}</span>,
    header: 'Files',
    id: 'files'
  },
  {
    accessorKey: 'updatedAt',
    cell: item => (
      <span className="text-muted tabular-nums">
        {formatDate(item.updatedAt)}
      </span>
    ),
    header: 'Last Updated',
    id: 'updatedAt'
  }
]

export function EmptyStateDemo() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <h2 className="text-xl font-bold">Projects</h2>

      <DataGrid
        aria-label="Projects"
        columns={columns}
        data={[]}
        getRowId={item => item.id}
        renderEmptyState={() => (
          <div className="py-6">
            <EmptyState size="sm">
              <EmptyState.Header>
                <EmptyState.Media className="border" variant="icon">
                  <FolderOpen />
                </EmptyState.Media>
                <EmptyState.Title>No Projects Yet</EmptyState.Title>
                <EmptyState.Description>
                  Get started by creating your first project. You can always
                  import existing projects later.
                </EmptyState.Description>
              </EmptyState.Header>
              <EmptyState.Content className="flex-row gap-2">
                <Button variant="outline">
                  <Plus />
                  Create Project
                </Button>
              </EmptyState.Content>
            </EmptyState>
          </div>
        )}
      />
    </div>
  )
}
