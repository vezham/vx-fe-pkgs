// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartLine,
  Comment,
  Copy,
  Hammer,
  Palette,
  Pencil,
  Video
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command } from '@vezham/react-pro-v3'
import { Button, Kbd } from '@vezham/react-v3'

function AppLogo({
  children,
  color
}: {
  children: React.ReactNode
  color: string
}) {
  return (
    <div
      className={`flex size-5 shrink-0 items-center justify-center rounded [&_svg]:size-3 [&_svg]:text-white ${color}`}>
      {children}
    </div>
  )
}

function CommandIconWell({
  children,
  className
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <div
      className={`flex size-5 shrink-0 items-center justify-center rounded-md [&_svg]:size-3 [&_svg]:text-white ${className}`}>
      {children}
    </div>
  )
}

export function Launcher() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Launcher{' '}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container size="lg">
            <Command.Dialog>
              <Command.InputGroup>
                <Command.InputGroup.Input placeholder="Search for apps and commands..." />
                <Command.InputGroup.ClearButton />
              </Command.InputGroup>
              <Command.List
                renderEmptyState={() => (
                  <div className="text-muted flex h-16 items-center justify-center text-sm">
                    No results found.
                  </div>
                )}>
                <Command.Group heading="Suggestions">
                  <Command.Item className="!h-10" textValue="Design Tool">
                    <AppLogo color="bg-violet-500">
                      <Palette />
                    </AppLogo>
                    <span>Design Tool</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Application
                    </span>
                  </Command.Item>
                  <Command.Item className="!h-10" textValue="Project Tracker">
                    <AppLogo color="bg-indigo-500">
                      <ChartLine />
                    </AppLogo>
                    <span>Project Tracker</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Application
                    </span>
                  </Command.Item>
                  <Command.Item className="!h-10" textValue="Team Chat">
                    <AppLogo color="bg-sky-500">
                      <Comment />
                    </AppLogo>
                    <span>Team Chat</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Application
                    </span>
                  </Command.Item>
                  <Command.Item className="!h-10" textValue="Video Platform">
                    <AppLogo color="bg-red-500">
                      <Video />
                    </AppLogo>
                    <span>Video Platform</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Application
                    </span>
                  </Command.Item>
                  <Command.Item className="!h-10" textValue="Notes">
                    <AppLogo color="bg-amber-500">
                      <Pencil />
                    </AppLogo>
                    <span>Notes</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Application
                    </span>
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Commands">
                  <Command.Item className="!h-10" textValue="Clipboard History">
                    <CommandIconWell className="bg-gradient-to-b from-red-400 to-red-600">
                      <Copy />
                    </CommandIconWell>
                    <span>Clipboard History</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Command
                    </span>
                  </Command.Item>
                  <Command.Item className="!h-10" textValue="Import Extension">
                    <CommandIconWell className="bg-gradient-to-b from-emerald-400 to-emerald-700">
                      <Hammer />
                    </CommandIconWell>
                    <span>Import Extension</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Command
                    </span>
                  </Command.Item>
                  <Command.Item className="!h-10" textValue="Manage Extensions">
                    <CommandIconWell className="bg-gradient-to-b from-emerald-400 to-emerald-700">
                      <Hammer />
                    </CommandIconWell>
                    <span>Manage Extensions</span>
                    <span className="text-muted ml-auto text-[13px]">
                      Command
                    </span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
              <Command.Footer className="justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Open Application</span>
                  <kbd className="bg-default flex h-5 items-center rounded px-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    ↵
                  </kbd>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-border h-3 w-px" />
                  <span className="text-xs">Actions</span>
                  <div className="flex gap-0.5">
                    <kbd className="bg-default flex h-5 items-center rounded px-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      ⌘
                    </kbd>
                    <kbd className="bg-default flex h-5 items-center rounded px-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      K
                    </kbd>
                  </div>
                </div>
              </Command.Footer>
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
