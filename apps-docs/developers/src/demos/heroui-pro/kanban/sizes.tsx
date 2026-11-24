// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Kanban } from '@vezham/react-pro-v3/kanban'
import { useKanban } from '@vezham/react-pro-v3/kanban'

import type { Ticket } from './_shared'
import { AddTaskModalProvider, TicketColumn, tickets } from './_shared'

function SizeBoard({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const kanban = useKanban<Ticket>({
    getColumn: item => item.status,
    initialItems: tickets.slice(0, 5),
    setColumn: (item, column) => ({ ...item, status: column })
  })

  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted text-xs font-medium">{size}</span>
      <Kanban size={size}>
        {['Open', 'In Progress'].map(col => (
          <AddTaskModalProvider key={col} column={col} kanban={kanban}>
            <TicketColumn
              color={col === 'Open' ? 'bg-success' : 'bg-warning'}
              column={col}
              kanban={kanban}
            />
          </AddTaskModalProvider>
        ))}
      </Kanban>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-10">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <SizeBoard key={size} size={size} />
      ))}
    </div>
  )
}
