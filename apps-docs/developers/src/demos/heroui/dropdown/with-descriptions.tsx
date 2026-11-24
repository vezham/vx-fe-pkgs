// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { FloppyDisk, FolderOpen, SquarePlus, TrashBin } from '@gravity-ui/icons'

import { Button, Description, Dropdown, Kbd, Label } from '@vezham/react-v3'

export function WithDescriptions() {
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={key => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="New file">
            <div className="flex h-8 items-start justify-center pt-px">
              <SquarePlus className="text-muted size-4 shrink-0" />
            </div>
            <div className="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="Open file">
            <div className="flex h-8 items-start justify-center pt-px">
              <FolderOpen className="text-muted size-4 shrink-0" />
            </div>
            <div className="flex flex-col">
              <Label>Open file</Label>
              <Description>Open an existing file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="Save file">
            <div className="flex h-8 items-start justify-center pt-px">
              <FloppyDisk className="text-muted size-4 shrink-0" />
            </div>
            <div className="flex flex-col">
              <Label>Save file</Label>
              <Description>Save the current file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item
            id="delete-file"
            textValue="Delete file"
            variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <TrashBin className="text-danger size-4 shrink-0" />
            </div>
            <div className="flex flex-col">
              <Label>Delete file</Label>
              <Description>Move to trash</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
