// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleCheck, CircleDashed, CirclePlay } from '@gravity-ui/icons'

import { Kanban } from '@vezham/react-pro-v3/kanban'
import { useKanban } from '@vezham/react-pro-v3/kanban'

import type { Ticket } from './_shared'
import {
  AddTaskModalProvider,
  TicketColumn,
  ticketColumns,
  tickets
} from './_shared'

export function Default() {
  const kanban = useKanban<Ticket>({
    getColumn: item => item.status,
    initialItems: tickets,
    setColumn: (item, column) => ({ ...item, status: column })
  })

  const columnIcons: Record<string, { color: string; icon: React.ReactNode }> =
    {
      Closed: { color: 'text-danger', icon: <CircleCheck /> },
      'In Progress': { color: 'text-warning', icon: <CirclePlay /> },
      Open: { color: 'text-success', icon: <CircleDashed /> }
    }

  return (
    <Kanban>
      {ticketColumns.map(col => (
        <AddTaskModalProvider key={col} column={col} kanban={kanban}>
          <TicketColumn
            color={columnIcons[col]?.color}
            column={col}
            icon={columnIcons[col]?.icon}
            kanban={kanban}
          />
        </AddTaskModalProvider>
      ))}
    </Kanban>
  )
}
