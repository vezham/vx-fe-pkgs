// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Comment,
  Envelope,
  FileText,
  Persons,
  Plus,
  Rectangles4
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command } from '@vezham/react-pro-v3'
import { Button, Kbd } from '@vezham/react-v3'

function ShortcutKbd({ keys }: { keys: string[] }) {
  return (
    <div className="ml-auto flex gap-1">
      {keys.map(k => (
        <kbd
          key={k}
          className="bg-default flex size-5 items-center justify-center rounded text-[11px] text-zinc-500 uppercase dark:text-zinc-400">
          {k}
        </kbd>
      ))}
    </div>
  )
}

export function Clean() {
  const [isOpen, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [pages, setPages] = useState<string[]>(['home'])
  const activePage = pages[pages.length - 1]
  const isHome = activePage === 'home'

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Clean{' '}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop
          isOpen={isOpen}
          onOpenChange={open => {
            setOpen(open)
            if (!open) {
              setPages(['home'])
              setInputValue('')
            }
          }}>
          <Command.Container size="lg">
            <Command.Dialog
              inputValue={inputValue}
              onInputChange={setInputValue}>
              <Command.Header className="flex flex-wrap gap-1 px-3 pt-2 pb-0">
                {pages.map(p => (
                  <span
                    key={p}
                    className="bg-default inline-flex h-5 items-center rounded px-2 text-xs font-medium text-zinc-500 capitalize dark:text-zinc-400">
                    {p}
                  </span>
                ))}
              </Command.Header>
              <Command.InputGroup>
                <Command.InputGroup.Input
                  placeholder="What do you need?"
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !isHome && !inputValue) {
                      e.preventDefault()
                      setPages(prev => prev.slice(0, -1))
                    }
                  }}
                />
                <Command.InputGroup.ClearButton />
              </Command.InputGroup>
              <Command.List
                renderEmptyState={() => (
                  <div className="text-muted flex h-12 items-center justify-center text-sm">
                    No results found.
                  </div>
                )}
                onAction={key => {
                  if (key === 'search-projects') {
                    setPages(prev => [...prev, 'projects'])
                    setInputValue('')
                  }
                }}>
                {activePage === 'home' && (
                  <>
                    <Command.Group heading="Projects">
                      <Command.Item
                        id="search-projects"
                        textValue="Search Projects">
                        <Rectangles4 />
                        <span>Search Projects...</span>
                        <ShortcutKbd keys={['S', 'P']} />
                      </Command.Item>
                      <Command.Item textValue="Create New Project">
                        <Plus />
                        <span>Create New Project...</span>
                      </Command.Item>
                    </Command.Group>
                    <Command.Group heading="Teams">
                      <Command.Item textValue="Search Teams">
                        <Persons />
                        <span>Search Teams...</span>
                        <ShortcutKbd keys={['⇧', 'P']} />
                      </Command.Item>
                      <Command.Item textValue="Create New Team">
                        <Plus />
                        <span>Create New Team...</span>
                      </Command.Item>
                    </Command.Group>
                    <Command.Group heading="Help">
                      <Command.Item textValue="Search Docs">
                        <FileText />
                        <span>Search Docs...</span>
                        <ShortcutKbd keys={['⇧', 'D']} />
                      </Command.Item>
                      <Command.Item textValue="Send Feedback">
                        <Comment />
                        <span>Send Feedback...</span>
                      </Command.Item>
                      <Command.Item textValue="Contact Support">
                        <Envelope />
                        <span>Contact Support</span>
                      </Command.Item>
                    </Command.Group>
                  </>
                )}
                {activePage === 'projects' && (
                  <>
                    {Array.from({ length: 6 }, (_, i) => (
                      <Command.Item
                        key={`project-${i}`}
                        textValue={`Project ${i + 1}`}>
                        <span>Project {i + 1}</span>
                      </Command.Item>
                    ))}
                  </>
                )}
              </Command.List>
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
