// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Clock,
  FileText,
  Gear,
  Magnifier,
  Persons,
  Sparkles
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command, EmptyState } from '@vezham/react-pro-v3'
import { Button, Chip, CloseButton, Kbd } from '@vezham/react-v3'

function MultipleSearchTermsContent() {
  return (
    <>
      <Command.InputGroup>
        <Command.InputGroup.Prefix>
          <Magnifier />
        </Command.InputGroup.Prefix>
        <Command.InputGroup.Input placeholder="Search or jump to" />
        <Command.InputGroup.ClearButton />
        <Command.InputGroup.Suffix>
          <Kbd className="text-xs">
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        </Command.InputGroup.Suffix>
      </Command.InputGroup>
      <Command.Header className="flex flex-col items-start gap-2 px-4">
        <div className="flex flex-wrap gap-1.5">
          {['Projects', 'Tasks', 'People', 'Documents', 'Channels'].map(
            label => (
              <Chip key={label} color="default" size="sm" variant="soft">
                <Chip.Label>{label}</Chip.Label>
                <CloseButton
                  aria-label={`Remove ${label}`}
                  className="-mr-px size-4 [&_svg]:size-3"
                />
              </Chip>
            )
          )}
        </div>
      </Command.Header>
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
        <Command.Group heading="Smart Prompt Examples">
          <Command.Item textValue="Summarize this week's progress">
            <Sparkles />
            <span>Summarize this week&apos;s progress</span>
          </Command.Item>
          <Command.Item textValue="Create a task for the team">
            <Sparkles />
            <span>Create a task for the team</span>
          </Command.Item>
          <Command.Item textValue="Draft a project brief">
            <Sparkles />
            <span>Draft a project brief</span>
          </Command.Item>
          <Command.Item textValue="Schedule a standup meeting">
            <Sparkles />
            <span>Schedule a standup meeting</span>
          </Command.Item>
        </Command.Group>
        <Command.Group
          heading={
            <span className="flex w-full items-center justify-between">
              <span>Results (4)</span>
              <button className="text-accent text-xs font-medium" type="button">
                See All
              </button>
            </span>
          }>
          <Command.Item textValue="View recent activity">
            <Clock />
            <span>View recent activity</span>
          </Command.Item>
          <Command.Item textValue="Open project roadmap">
            <FileText />
            <span>Open project roadmap</span>
          </Command.Item>
          <Command.Item textValue="Browse team directory">
            <Persons />
            <span>Browse team directory</span>
          </Command.Item>
          <Command.Item textValue="Manage workspace settings">
            <Gear />
            <span>Manage workspace settings</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
      <Command.Footer className="h-10 justify-between [&_kbd]:h-5 [&_kbd]:text-xs">
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
        <span className="text-muted text-xs">
          Not what you&apos;re looking for? Try the{' '}
          <button className="text-accent font-medium" type="button">
            Help Center
          </button>
        </span>
      </Command.Footer>
    </>
  )
}

export function MultipleSearchTerms() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Multiple Search Terms{' '}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container size="lg">
            <Command.Dialog>
              <MultipleSearchTermsContent />
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
