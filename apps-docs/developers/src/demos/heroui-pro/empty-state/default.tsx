// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { FolderOpen } from '@gravity-ui/icons'

import { EmptyState } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function Default() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media variant="icon">
            <FolderOpen />
          </EmptyState.Media>
          <EmptyState.Title>No Projects Yet</EmptyState.Title>
          <EmptyState.Description>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content className="flex-row gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  )
}
