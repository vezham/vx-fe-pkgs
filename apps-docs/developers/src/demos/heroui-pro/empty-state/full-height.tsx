// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Person } from '@gravity-ui/icons'

import { EmptyState } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function FullHeight() {
  return (
    <div className="border-border flex h-[400px] w-[500px] items-center justify-center rounded-2xl border border-dashed">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media variant="icon">
            <Person />
          </EmptyState.Media>
          <EmptyState.Title>No Results Found</EmptyState.Title>
          <EmptyState.Description className="max-w-xs text-pretty">
            We couldn&apos;t find anything matching your search. Try adjusting
            your filters.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button size="sm" variant="outline">
            Clear Filters
          </Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  )
}
