// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Copy,
  FileText,
  Link as LinkIcon,
  Pencil,
  Scissors,
  TrashBin
} from '@gravity-ui/icons'

import { ContextMenu } from '@vezham/react-pro-v3'
import { Header, Kbd, Label, Separator } from '@vezham/react-v3'

export function WithSections() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
          Right-click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <ContextMenu.Section>
            <Header>Edit</Header>
            <ContextMenu.Item id="cut" textValue="Cut">
              <Scissors className="text-muted size-4" />
              <Label>Cut</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>X</Kbd.Content>
              </Kbd>
            </ContextMenu.Item>
            <ContextMenu.Item id="copy" textValue="Copy">
              <Copy className="text-muted size-4" />
              <Label>Copy</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>C</Kbd.Content>
              </Kbd>
            </ContextMenu.Item>
            <ContextMenu.Item id="paste" textValue="Paste">
              <FileText className="text-muted size-4" />
              <Label>Paste</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>V</Kbd.Content>
              </Kbd>
            </ContextMenu.Item>
          </ContextMenu.Section>
          <Separator />
          <ContextMenu.Section>
            <Header>Manage</Header>
            <ContextMenu.Item id="rename" textValue="Rename">
              <Pencil className="text-muted size-4" />
              <Label>Rename</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="copy-link" textValue="Copy Link">
              <LinkIcon className="text-muted size-4" />
              <Label>Copy Link</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="delete" textValue="Delete" variant="danger">
              <TrashBin className="text-danger size-4" />
              <Label>Delete</Label>
            </ContextMenu.Item>
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}
