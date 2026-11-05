import { useState } from 'react'

import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  TextField,
  useOverlayState
} from '@vezham/react-v3'

import { useWorkspace } from './index'

export type WorkspaceAction = { id: string; type: 'rename' | 'delete' }

export const WorkspaceActionDialog = ({
  action,
  onClose
}: {
  action: WorkspaceAction
  onClose: () => void
}) => {
  const workspace = useWorkspace()
  const target = workspace.workspaces.find(item => item.id === action.id)
  const [name, setName] = useState(target?.name ?? '')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const deleting = action.type === 'delete'
  const state = useOverlayState({
    isOpen: true,
    onOpenChange: open => {
      if (!open && !pending) onClose()
    }
  })
  const submit = async () => {
    if (pending || !target) return
    setPending(true)
    setError('')
    try {
      const saved = deleting
        ? await workspace.remove(target.id)
        : await workspace.rename(target.id, name)
      if (saved) onClose()
      else
        setError(
          deleting && workspace.workspaces.length <= 1
            ? 'Keep at least one workspace.'
            : 'Unable to save this change. Check browser storage permissions.'
        )
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'Unable to update workspace.'
      )
    } finally {
      setPending(false)
    }
  }
  return (
    <Modal state={state}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center" size="sm">
          <Modal.Dialog>
            <Modal.CloseTrigger
              aria-label="Close workspace action"
              isDisabled={pending}
            />
            <Modal.Header>
              <Modal.Heading>
                {deleting ? 'Delete workspace' : 'Rename workspace'}
              </Modal.Heading>
            </Modal.Header>
            <Form
              onSubmit={event => {
                event.preventDefault()
                void submit()
              }}>
              <Modal.Body className="flex flex-col gap-4">
                {deleting ? (
                  <p>
                    Delete <strong>{target?.name}</strong>? Its local notes,
                    chat history, and workspace data will be permanently removed
                    from this browser.
                  </p>
                ) : (
                  <TextField
                    isRequired
                    value={name}
                    onChange={setName}
                    isDisabled={pending}>
                    <Label>Workspace name</Label>
                    <Input maxLength={64} />
                  </TextField>
                )}
                {error && (
                  <p role="alert" className="text-danger text-sm">
                    {error}
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onPress={onClose}
                  isDisabled={pending}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant={deleting ? 'danger' : 'primary'}
                  isPending={pending}
                  isDisabled={
                    !target ||
                    !workspace.isReady ||
                    Boolean(workspace.error) ||
                    (deleting ? workspace.workspaces.length <= 1 : !name.trim())
                  }>
                  {deleting ? 'Delete workspace' : 'Save name'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
