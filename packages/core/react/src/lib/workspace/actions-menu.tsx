import { MenuDots, Pen, TrashBinTrash } from '@vezham/icons-react'
import { Button, Dropdown } from '@vezham/react-v3'

import type { WorkspaceAction } from './action-dialog'
import type { LocalWorkspace } from './model'

export const WorkspaceActionsMenu = ({
  workspace,
  canDelete,
  onAction
}: {
  workspace: LocalWorkspace
  canDelete: boolean
  onAction: (action: WorkspaceAction) => void
}) => (
  <Dropdown>
    <Button
      variant="ghost"
      size="sm"
      isIconOnly
      aria-label={`Options for ${workspace.name}`}
      className="size-8 min-w-8 shrink-0">
      <MenuDots size={18} aria-hidden="true" />
    </Button>
    <Dropdown.Popover className="z-90 w-44">
      <Dropdown.Menu aria-label={`Workspace actions for ${workspace.name}`}>
        <Dropdown.Item
          id="rename"
          textValue="Rename"
          onAction={() => onAction({ id: workspace.id, type: 'rename' })}>
          <Pen size={18} aria-hidden="true" />
          Rename
        </Dropdown.Item>
        <Dropdown.Item
          id="delete"
          textValue="Delete"
          variant="danger"
          isDisabled={!canDelete}
          onAction={() => onAction({ id: workspace.id, type: 'delete' })}>
          <TrashBinTrash size={18} aria-hidden="true" />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
)
