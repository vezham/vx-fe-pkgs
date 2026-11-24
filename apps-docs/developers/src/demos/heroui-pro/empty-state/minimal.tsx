// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { EmptyState } from '@vezham/react-pro-v3'

export function Minimal() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Title>Nothing here yet</EmptyState.Title>
          <EmptyState.Description>
            Content will appear here once it becomes available.
          </EmptyState.Description>
        </EmptyState.Header>
      </EmptyState>
    </div>
  )
}
