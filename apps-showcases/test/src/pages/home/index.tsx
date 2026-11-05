import { useWorkspace, useWorkspaceStore } from '@vezham/react'
import { Card, Description, Label, TextArea, TextField } from '@vezham/react-v3'

const parseNotes = (value: unknown) => {
  if (typeof value !== 'string') throw new Error('Invalid workspace notes')
  return value
}

export default () => {
  const workspace = useWorkspace()
  const notes = useWorkspaceStore('scratchpad', '', { parse: parseNotes })
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 md:p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{workspace.active.name}</h1>
        <p className="text-muted text-sm">
          Local workspace · Saved in this browser
        </p>
      </header>
      {Boolean(workspace.error) && (
        <p role="alert" className="text-danger text-sm">
          Unable to read or save the workspace catalog. Check browser storage
          permissions.
        </p>
      )}
      <Card>
        <Card.Header>
          <Card.Title>Workspace scratchpad</Card.Title>
          <Card.Description>
            Each workspace has its own notes. Switch workspaces to try it.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <TextField
            value={notes.value}
            onChange={notes.setValue}
            isDisabled={
              !workspace.isReady ||
              !notes.isReady ||
              Boolean(workspace.error) ||
              Boolean(notes.error)
            }>
            <Label>Workspace notes</Label>
            <TextArea
              rows={8}
              placeholder="Write something for this workspace…"
            />
            <Description>
              Your notes stay available when you reload or go offline.
            </Description>
          </TextField>
          <p
            role={notes.error ? 'alert' : 'status'}
            className={`mt-3 text-xs ${notes.error ? 'text-danger' : 'text-muted'}`}>
            {notes.error
              ? 'Unable to save notes. Check browser storage permissions.'
              : notes.isSaved
                ? 'Saved in this browser'
                : 'Saving…'}
          </p>
        </Card.Content>
      </Card>
    </main>
  )
}
