// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  BranchesRight,
  ChartLine,
  Comment,
  Eye,
  Flag,
  LayoutList,
  Magnifier
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command, EmptyState } from '@vezham/react-pro-v3'
import { Button, Kbd } from '@vezham/react-v3'

function DevToolbarContent() {
  return (
    <>
      <Command.InputGroup>
        <Command.InputGroup.Prefix>
          <Magnifier />
        </Command.InputGroup.Prefix>
        <Command.InputGroup.Input placeholder="What do you need?" />
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
        <Command.Group>
          <Command.Item
            className="bg-default"
            textValue="View Environment staging">
            <span className="bg-success size-2 shrink-0 rounded-full" />
            <div className="flex flex-col">
              <span className="font-medium">View Environment</span>
              <span className="text-muted text-xs">
                staging/feat-dashboard-redesign
              </span>
            </div>
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Collaboration">
          <Command.Item textValue="Feedback">
            <Comment />
            <span>Feedback</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>C</Kbd.Content>
            </Kbd>
          </Command.Item>
          <Command.Item textValue="Notifications">
            <Bell />
            <span>Notifications</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Command.Item>
          <Command.Item textValue="Feature Flags">
            <Flag />
            <span>Feature Flags...</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>F</Kbd.Content>
            </Kbd>
          </Command.Item>
          <Command.Item textValue="Share Preview">
            <Eye />
            <span>Share Preview</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Command.Item>
          <Command.Item textValue="Switch Branch">
            <BranchesRight />
            <span>Switch Branch...</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>B</Kbd.Content>
            </Kbd>
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Development">
          <Command.Item textValue="View Logs">
            <LayoutList />
            <span>View Logs</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>L</Kbd.Content>
            </Kbd>
          </Command.Item>
          <Command.Item textValue="Tracing">
            <ChartLine />
            <span>Tracing...</span>
            <Kbd className="ms-auto text-xs" slot="keyboard">
              <Kbd.Content>T</Kbd.Content>
            </Kbd>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </>
  )
}

export function DevToolbar() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Dev Toolbar{' '}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container>
            <Command.Dialog>
              <DevToolbarContent />
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
