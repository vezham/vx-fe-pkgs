// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Bell } from '@gravity-ui/icons'

import { EmptyState } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function WithBackground() {
  return (
    <div className="w-[420px]">
      <EmptyState className="bg-surface-secondary rounded-2xl">
        <EmptyState.Header>
          <EmptyState.Media
            className="bg-surface-tertiary border"
            variant="icon">
            <Bell />
          </EmptyState.Media>
          <EmptyState.Title>No Notifications</EmptyState.Title>
          <EmptyState.Description className="max-w-xs text-pretty">
            You&apos;re all caught up. New notifications will appear here.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button variant="outline">Refresh</Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  )
}
