// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  FilePlus,
  FolderPlus,
  Keyboard,
  Magnifier,
  Palette,
  PersonNutHex,
  PersonPencil
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command, EmptyState } from '@vezham/react-pro-v3'
import { Button, Chip, Kbd } from '@vezham/react-v3'

function CommandDialogContent() {
  return (
    <>
      <Command.Header>
        <Chip size="sm">Home</Chip>
      </Command.Header>
      <Command.InputGroup>
        <Command.InputGroup.Prefix>
          <Magnifier />
        </Command.InputGroup.Prefix>
        <Command.InputGroup.Input placeholder="Type a command or search..." />
        <Command.InputGroup.ClearButton />
        <Command.InputGroup.Suffix>
          <Kbd className="text-xs">
            <Kbd.Content>Esc</Kbd.Content>
          </Kbd>
        </Command.InputGroup.Suffix>
      </Command.InputGroup>
      <Command.List
        renderEmptyState={() => (
          <EmptyState size="sm">
            <EmptyState.Header>
              <EmptyState.Media variant="icon">
                <Magnifier />
              </EmptyState.Media>
              <EmptyState.Title>No results found</EmptyState.Title>
              <EmptyState.Description>
                Try a different search term.
              </EmptyState.Description>
            </EmptyState.Header>
          </EmptyState>
        )}>
        <Command.Group heading="Actions">
          <Command.Item textValue="Create new file">
            <FilePlus />
            <span>Create new file...</span>
          </Command.Item>
          <Command.Item textValue="Create new folder">
            <FolderPlus />
            <span>Create new folder...</span>
          </Command.Item>
          <Command.Item textValue="Assign to me">
            <PersonPencil />
            <span>Assign to me</span>
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Settings">
          <Command.Item textValue="Preferences">
            <PersonNutHex />
            <span>Preferences</span>
          </Command.Item>
          <Command.Item textValue="Change theme">
            <Palette />
            <span>Change theme</span>
          </Command.Item>
          <Command.Item textValue="Keyboard shortcuts">
            <Keyboard />
            <span>Keyboard shortcuts</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
      <Command.Footer className="justify-between [&_kbd]:h-5 [&_kbd]:text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Kbd className="text-xs">
                <Kbd.Abbr keyValue="up" />
              </Kbd>
              <Kbd className="text-xs">
                <Kbd.Abbr keyValue="down" />
              </Kbd>
            </div>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>
              <Kbd.Abbr keyValue="enter" />
            </Kbd>
            <span>Select</span>
          </div>
        </div>
      </Command.Footer>
    </>
  )
}

export function Sizes() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {(['sm', 'md', 'lg'] as const).map(s => (
          <Button
            key={s}
            variant="tertiary"
            onPress={() => {
              setSize(s)
              setOpen(true)
            }}>
            Size: {s}
          </Button>
        ))}
      </div>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container size={size}>
            <Command.Dialog>
              <CommandDialogContent />
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </div>
  )
}
