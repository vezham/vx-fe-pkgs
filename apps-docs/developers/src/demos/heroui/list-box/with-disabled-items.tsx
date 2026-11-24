// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Pencil, SquarePlus, TrashBin } from '@gravity-ui/icons'

import {
  Description,
  Header,
  Kbd,
  Label,
  ListBox,
  Separator,
  Surface
} from '@vezham/react-v3'

export function WithDisabledItems() {
  return (
    <Surface className="shadow-surface w-[256px] rounded-3xl">
      <ListBox
        aria-label="File actions"
        className="w-full p-2"
        disabledKeys={['delete-file']}
        selectionMode="none"
        onAction={key => alert(`Selected item: ${key}`)}>
        <ListBox.Section>
          <Header>Actions</Header>
          <ListBox.Item id="new-file" textValue="New file">
            <div className="flex h-8 items-start justify-center pt-px">
              <SquarePlus className="text-muted size-4 shrink-0" />
            </div>
            <div className="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </ListBox.Item>
          <ListBox.Item id="edit-file" textValue="Edit file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Pencil className="text-muted size-4 shrink-0" />
            </div>
            <div className="flex flex-col">
              <Label>Edit file</Label>
              <Description>Make changes</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>E</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
        <Separator />
        <ListBox.Section>
          <Header>Danger zone</Header>
          <ListBox.Item
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
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </Surface>
  )
}
