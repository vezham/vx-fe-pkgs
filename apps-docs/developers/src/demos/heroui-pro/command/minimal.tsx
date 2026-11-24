// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartLine,
  Clock,
  Flag,
  LayoutList,
  PersonPencil,
  TrashBin
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command } from '@vezham/react-pro-v3'
import { Button, Kbd } from '@vezham/react-v3'

const minimalItemClass = [
  '!rounded-none !gap-3',
  'before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-[#5f6ad2] before:opacity-0',
  'data-[focused=true]:before:opacity-100',
  'data-[focused=true]:!bg-zinc-100 dark:data-[focused=true]:!bg-zinc-800/50'
].join(' ')

const items = [
  { icon: <PersonPencil />, keys: ['A'], label: 'Assign to...' },
  { icon: <PersonPencil />, keys: ['I'], label: 'Assign to me' },
  { icon: <LayoutList />, keys: ['S'], label: 'Change status...' },
  { icon: <ChartLine />, keys: ['P'], label: 'Change priority...' },
  { icon: <Flag />, keys: ['L'], label: 'Change labels...' },
  { icon: <TrashBin />, keys: ['⇧', 'L'], label: 'Remove label...' },
  { icon: <Clock />, keys: ['⇧', 'D'], label: 'Set due date...' }
]

export function Minimal() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Minimal{' '}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container size="lg">
            <Command.Dialog>
              <Command.Header className="px-4 pt-4 pb-0">
                <div className="bg-default flex h-6 items-center rounded px-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Issue - FUN-343
                </div>
              </Command.Header>
              <Command.InputGroup>
                <Command.InputGroup.Input
                  className="!text-lg caret-[#6e5ed2]"
                  placeholder="Type a command or search..."
                />
                <Command.InputGroup.ClearButton />
              </Command.InputGroup>
              <Command.List
                renderEmptyState={() => (
                  <div className="text-muted flex h-16 items-center justify-center text-sm">
                    No results found.
                  </div>
                )}>
                {items.map(({ icon, keys, label }) => (
                  <Command.Item
                    key={label}
                    className={minimalItemClass}
                    textValue={label}>
                    {icon}
                    <span>{label}</span>
                    <div className="ml-auto flex gap-2">
                      {keys.map(k => (
                        <kbd
                          key={k}
                          className="text-[13px] text-zinc-500 dark:text-zinc-400">
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </Command.Item>
                ))}
              </Command.List>
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
