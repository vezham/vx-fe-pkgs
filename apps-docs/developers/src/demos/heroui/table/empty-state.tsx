// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Icon } from '@iconify/react'

import { EmptyState, Table } from '@vezham/react-v3'

export function EmptyStateDemo() {
  return (
    <Table className="min-h-[200px]">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Empty table"
          className="h-full min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Email</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                <Icon className="text-muted size-6" icon="gravity-ui:tray" />
                <span className="text-muted text-sm">No results found</span>
              </EmptyState>
            )}>
            {[]}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
