import { type ReactNode, createContext, useContext, useState } from 'react'

import {
  Kanban,
  type UseKanbanReturn,
  useKanbanColumn
} from '@vezham/react-pro-v3/kanban'
import { Button, Input, Label, Modal, TextField } from '@vezham/react-v3'

export type Ticket = { id: string; title: string; status: string }
export const ticketColumns = ['Open', 'In Progress', 'Closed']
export const tickets: Ticket[] = [
  { id: 'docs', title: 'Write component documentation', status: 'Open' },
  { id: 'design', title: 'Review the new navigation', status: 'Open' },
  { id: 'a11y', title: 'Check keyboard interactions', status: 'In Progress' },
  { id: 'tests', title: 'Add integration coverage', status: 'In Progress' },
  { id: 'release', title: 'Publish the release notes', status: 'Closed' }
]

const TaskContext = createContext<{
  column: string
  kanban: UseKanbanReturn<Ticket>
} | null>(null)

export const AddTaskModalProvider = ({
  children,
  column,
  kanban
}: {
  children: ReactNode
  column: string
  kanban: UseKanbanReturn<Ticket>
}) => (
  <TaskContext.Provider value={{ column, kanban }}>
    {children}
  </TaskContext.Provider>
)

export const TicketColumn = ({
  column,
  kanban,
  icon,
  color
}: {
  column: string
  kanban: UseKanbanReturn<Ticket>
  icon?: ReactNode
  color?: string
}) => {
  const context = useContext(TaskContext)
  const [title, setTitle] = useState('')
  const { items, dragAndDropHooks } = useKanbanColumn(kanban, column)
  return (
    <Kanban.Column>
      <Kanban.ColumnHeader>
        <Kanban.ColumnIndicator className={color}>
          {icon}
        </Kanban.ColumnIndicator>
        <Kanban.ColumnTitle>{column}</Kanban.ColumnTitle>
        <Kanban.ColumnCount>{items.length}</Kanban.ColumnCount>
        <Kanban.ColumnActions>
          <Modal>
            <Button
              aria-label={`Add task to ${column}`}
              size="sm"
              variant="tertiary">
              +
            </Button>
            <Modal.Backdrop>
              <Modal.Container>
                <Modal.Dialog>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Heading>Add task</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <TextField value={title} onChange={setTitle}>
                      <Label>Title</Label>
                      <Input placeholder="Task title" />
                    </TextField>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button
                      slot="close"
                      isDisabled={!title.trim()}
                      onPress={() => {
                        const board = context?.kanban ?? kanban
                        board.addItem({
                          id: crypto.randomUUID(),
                          title: title.trim(),
                          status: context?.column ?? column
                        })
                        setTitle('')
                      }}>
                      Add task
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Kanban.ColumnActions>
      </Kanban.ColumnHeader>
      <Kanban.ColumnBody>
        <Kanban.CardList
          aria-label={column}
          items={items}
          dragAndDropHooks={dragAndDropHooks}>
          {item => (
            <Kanban.Card id={item.id} textValue={item.title}>
              {item.title}
            </Kanban.Card>
          )}
        </Kanban.CardList>
      </Kanban.ColumnBody>
    </Kanban.Column>
  )
}
