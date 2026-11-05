import {
  Add,
  AltArrowLeft,
  AltArrowRight,
  CheckRead,
  Laptop
} from '@vezham/icons-react'
import { Button, Dropdown, Header, Label } from '@vezham/react-v3'

import type { WorkspaceAction } from './action-dialog'
import { WorkspaceActionsMenu } from './actions-menu'
import type { useWorkspace } from './index'

type Props = {
  workspace: ReturnType<typeof useWorkspace>
  select: (id: string) => void
  create: () => void
  onAction: (action: WorkspaceAction) => void
}

const renderWorkspaceItems = ({
  workspace,
  select,
  create,
  onAction
}: Props) => (
  <>
    <Dropdown.Section>
      <Header>Local storage</Header>
      {workspace.workspaces.map(item => (
        <Dropdown.Item
          key={item.id}
          id={`workspace:${item.id}`}
          isDisabled={!workspace.isReady || Boolean(workspace.error)}
          aria-label={item.name}
          aria-current={item.id === workspace.active.id ? true : undefined}
          textValue={item.name}
          onAction={() => select(item.id)}>
          <Laptop size={18} aria-hidden="true" />
          <Label className="min-w-0 flex-1 truncate">{item.name}</Label>
          <WorkspaceActionsMenu
            workspace={item}
            canDelete={workspace.workspaces.length > 1}
            onAction={onAction}
          />
          {item.id === workspace.active.id && (
            <CheckRead size={18} aria-hidden="true" />
          )}
        </Dropdown.Item>
      ))}
    </Dropdown.Section>
    <Dropdown.Item
      id="create-workspace"
      isDisabled={!workspace.isReady || Boolean(workspace.error)}
      textValue="Create workspace"
      onAction={create}>
      <Add size={18} aria-hidden="true" />
      <Label>Create workspace</Label>
    </Dropdown.Item>
  </>
)

export const renderWorkspaceMenuSection = (props: Props) => (
  <Dropdown.SubmenuTrigger>
    <Dropdown.Item
      id="workspaces"
      isDisabled={!props.workspace.isReady || Boolean(props.workspace.error)}
      aria-label="Choose workspace"
      textValue={props.workspace.active.name}>
      <Laptop size={18} aria-hidden="true" />
      <Label className="min-w-0 flex-1 truncate">
        {props.workspace.active.name}
      </Label>
      <Dropdown.SubmenuIndicator />
    </Dropdown.Item>
    <Dropdown.Popover className="z-90 w-72 max-w-[calc(100vw-2rem)]">
      <Dropdown.Menu
        aria-label="Workspaces"
        className="max-h-80 overflow-y-auto">
        {renderWorkspaceItems(props)}
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown.SubmenuTrigger>
)

export const WorkspaceSheetTrigger = ({
  name,
  onPress
}: {
  name: string
  onPress: () => void
}) => (
  <Button
    variant="ghost"
    aria-label="Choose workspace"
    className="h-auto min-h-11 w-full justify-start gap-3 px-3 py-2 text-start"
    onPress={onPress}>
    <Laptop size={18} aria-hidden="true" />
    <span className="min-w-0 flex-1 truncate text-start">{name}</span>
    <AltArrowRight size={16} aria-hidden="true" />
  </Button>
)

export const WorkspaceSheetItems = ({
  workspace,
  select,
  create,
  onAction,
  onBack
}: Props & { onBack: () => void }) => (
  <div className="w-full">
    <Button
      variant="ghost"
      className="mb-3 w-full justify-start gap-3"
      aria-label="Back to account menu"
      onPress={onBack}>
      <AltArrowLeft size={18} aria-hidden="true" />
      Workspaces
    </Button>
    <p className="text-muted px-3 pb-2 text-xs">Local storage</p>
    <div className="flex flex-col gap-1">
      {workspace.workspaces.map(item => (
        <div key={item.id} className="flex items-center gap-1">
          <Button
            variant={item.id === workspace.active.id ? 'secondary' : 'ghost'}
            className="h-auto min-h-11 w-full justify-start gap-3 whitespace-normal"
            isDisabled={!workspace.isReady || Boolean(workspace.error)}
            aria-pressed={item.id === workspace.active.id}
            onPress={() => select(item.id)}>
            <Laptop size={18} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 text-start wrap-anywhere">
              {item.name}
            </span>
            {item.id === workspace.active.id && (
              <CheckRead size={18} className="shrink-0" aria-hidden="true" />
            )}
          </Button>
          <WorkspaceActionsMenu
            workspace={item}
            canDelete={workspace.workspaces.length > 1}
            onAction={onAction}
          />
        </div>
      ))}
      <Button
        variant="ghost"
        className="mt-2 w-full justify-start gap-3"
        isDisabled={!workspace.isReady || Boolean(workspace.error)}
        onPress={create}>
        <Add size={18} aria-hidden="true" />
        Create workspace
      </Button>
    </div>
  </div>
)
