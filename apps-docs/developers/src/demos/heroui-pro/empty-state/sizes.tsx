// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { FolderOpen } from '@gravity-ui/icons'

import { EmptyState } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function Sizes() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-muted text-center text-xs">{size}</span>
          <div className="border-border w-[300px] rounded-2xl border border-dashed">
            <EmptyState size={size}>
              <EmptyState.Header>
                <EmptyState.Media variant="icon">
                  <FolderOpen />
                </EmptyState.Media>
                <EmptyState.Title>No Projects Yet</EmptyState.Title>
                <EmptyState.Description>
                  You haven&apos;t created any projects yet. Get started by
                  creating your first project.
                </EmptyState.Description>
              </EmptyState.Header>
              <EmptyState.Content className="flex-row gap-2">
                <Button size={size}>Create Project</Button>
                <Button size={size} variant="outline">
                  Import Project
                </Button>
              </EmptyState.Content>
            </EmptyState>
          </div>
        </div>
      ))}
    </div>
  )
}
