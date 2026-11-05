import { useState } from 'react'

import { Laptop } from '@vezham/icons-react'
import {
  Button,
  Description,
  Form,
  Input,
  Label,
  Modal,
  TextField,
  useOverlayState
} from '@vezham/react-v3'

import { useWorkspace } from './index'

export const CreateWorkspaceDialog = ({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const state = useOverlayState({ isOpen, onOpenChange })
  return (
    <Modal state={state}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center" size="sm">
          <Modal.Dialog>
            <Modal.CloseTrigger aria-label="Close create workspace" />
            <Modal.Header>
              <Modal.Heading>Name your workspace</Modal.Heading>
            </Modal.Header>
            <CreateWorkspaceForm onClose={() => onOpenChange(false)} />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

const CreateWorkspaceForm = ({ onClose }: { onClose: () => void }) => {
  const workspace = useWorkspace()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)
  const submit = async () => {
    if (isPending) return
    setIsPending(true)
    setError('')
    try {
      if (await workspace.create(name)) onClose()
      else
        setError(
          'Unable to save this workspace. Check browser storage permissions.'
        )
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'Unable to create workspace.'
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form
      onSubmit={event => {
        event.preventDefault()
        void submit()
      }}>
      <Modal.Body className="flex flex-col gap-5">
        <p className="text-muted text-sm">
          A workspace keeps your app data together. Create one for yourself, a
          project, or a team.
        </p>
        <TextField
          isRequired
          value={name}
          onChange={setName}
          isInvalid={Boolean(error)}
          isDisabled={isPending}>
          <Label>Workspace name</Label>
          <Input placeholder="Set a workspace name" maxLength={64} />
        </TextField>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Workspace type</span>
          <div className="bg-surface-secondary flex items-center gap-3 rounded-lg p-3">
            <Laptop size={20} aria-hidden="true" />
            <span className="text-sm">Local storage</span>
          </div>
          <Description>Saved in this browser. No sign-in needed.</Description>
        </div>
        {error && (
          <p role="alert" className="text-danger text-sm">
            {error}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onPress={onClose} isDisabled={isPending}>
          Cancel
        </Button>
        <Button
          type="submit"
          isPending={isPending}
          isDisabled={
            !name.trim() || !workspace.isReady || Boolean(workspace.error)
          }>
          Create workspace
        </Button>
      </Modal.Footer>
    </Form>
  )
}
