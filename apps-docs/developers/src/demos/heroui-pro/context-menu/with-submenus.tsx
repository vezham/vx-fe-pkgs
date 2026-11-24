// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { ContextMenu } from '@vezham/react-pro-v3'
import type { Selection } from '@vezham/react-v3'
import { Header, Kbd, Label, Separator } from '@vezham/react-v3'

export function WithSubmenus() {
  const [bookmarksChecked, setBookmarksChecked] = useState<Selection>(
    new Set(['bookmarks'])
  )
  const [person, setPerson] = useState<Selection>(new Set(['junior']))

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
          Right-click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <ContextMenu.Item id="back" textValue="Back">
            <Label>Back</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>[</Kbd.Content>
            </Kbd>
          </ContextMenu.Item>
          <ContextMenu.Item isDisabled id="forward" textValue="Forward">
            <Label>Forward</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>]</Kbd.Content>
            </Kbd>
          </ContextMenu.Item>
          <ContextMenu.Item id="reload" textValue="Reload">
            <Label>Reload</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>R</Kbd.Content>
            </Kbd>
          </ContextMenu.Item>
          <ContextMenu.SubmenuTrigger>
            <ContextMenu.Item id="more-tools" textValue="More Tools">
              <Label>More Tools</Label>
              <ContextMenu.SubmenuIndicator />
            </ContextMenu.Item>
            <ContextMenu.Popover>
              <ContextMenu.Menu>
                <ContextMenu.Item id="save-page" textValue="Save Page As…">
                  <Label>Save Page As…</Label>
                  <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>S</Kbd.Content>
                  </Kbd>
                </ContextMenu.Item>
                <ContextMenu.Item id="shortcut" textValue="Create Shortcut…">
                  <Label>Create Shortcut…</Label>
                </ContextMenu.Item>
                <ContextMenu.Item id="name-window" textValue="Name Window…">
                  <Label>Name Window…</Label>
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item id="dev-tools" textValue="Developer Tools">
                  <Label>Developer Tools</Label>
                </ContextMenu.Item>
              </ContextMenu.Menu>
            </ContextMenu.Popover>
          </ContextMenu.SubmenuTrigger>
          <Separator />
          <ContextMenu.Section
            selectedKeys={bookmarksChecked}
            selectionMode="multiple"
            onSelectionChange={setBookmarksChecked}>
            <ContextMenu.Item id="bookmarks" textValue="Show Bookmarks">
              <ContextMenu.ItemIndicator />
              <Label>Show Bookmarks</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>B</Kbd.Content>
              </Kbd>
            </ContextMenu.Item>
            <ContextMenu.Item id="urls" textValue="Show Full URLs">
              <ContextMenu.ItemIndicator />
              <Label>Show Full URLs</Label>
            </ContextMenu.Item>
          </ContextMenu.Section>
          <Separator />
          <ContextMenu.Section
            selectedKeys={person}
            selectionMode="single"
            onSelectionChange={setPerson}>
            <Header>People</Header>
            <ContextMenu.Item id="junior" textValue="Junior">
              <ContextMenu.ItemIndicator type="dot" />
              <Label>Junior</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="andres" textValue="Andres">
              <ContextMenu.ItemIndicator type="dot" />
              <Label>Andres</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="volodymyr" textValue="Volodymyr">
              <ContextMenu.ItemIndicator type="dot" />
              <Label>Volodymyr</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="diego" textValue="Diego">
              <ContextMenu.ItemIndicator type="dot" />
              <Label>Diego</Label>
            </ContextMenu.Item>
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}
