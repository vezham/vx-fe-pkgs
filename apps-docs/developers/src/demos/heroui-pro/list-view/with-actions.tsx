// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Archive,
  ArrowDownToLine,
  File,
  Folder,
  Pencil,
  TrashBin,
  Xmark
} from '@gravity-ui/icons'
import { useState } from 'react'
import type { Selection } from 'react-aria-components/GridList'

import { ActionBar, ListView } from '@vezham/react-pro-v3'
import { Button, Chip, Separator, Tooltip } from '@vezham/react-v3'

const files = [
  { icon: 'folder', id: '1', name: 'Design System', updated: '2 days ago' },
  { icon: 'folder', id: '2', name: 'Photos', updated: '1 week ago' },
  { icon: 'file', id: '3', name: 'README.md', updated: '3 hours ago' },
  { icon: 'file', id: '4', name: 'package.json', updated: 'Yesterday' },
  { icon: 'folder', id: '5', name: 'src', updated: 'Just now' },
  { icon: 'file', id: '6', name: '.gitignore', updated: '2 weeks ago' },
  { icon: 'file', id: '7', name: 'tsconfig.json', updated: '3 days ago' },
  { icon: 'folder', id: '8', name: 'node_modules', updated: '1 day ago' }
]

export function WithActions() {
  const [selected, setSelected] = useState<Selection>(new Set())

  const selectionCount =
    selected === 'all' ? files.length : (selected as Set<string>).size

  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Project files"
        items={files}
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={setSelected}>
        {file => (
          <ListView.Item id={file.id} textValue={file.name}>
            <ListView.ItemContent>
              {file.icon === 'folder' ? <Folder /> : <File />}
              <div className="flex min-w-0 flex-col">
                <ListView.Title>{file.name}</ListView.Title>
                <ListView.Description>
                  Updated {file.updated}
                </ListView.Description>
              </div>
            </ListView.ItemContent>
          </ListView.Item>
        )}
      </ListView>

      <ActionBar aria-label="File actions" isOpen={selectionCount > 0}>
        <ActionBar.Prefix>
          <Chip className="shrink-0 tabular-nums" size="sm">
            {selectionCount}
          </Chip>
        </ActionBar.Prefix>
        <Separator />
        <ActionBar.Content>
          <Button aria-label="Edit" size="sm" variant="ghost">
            <Pencil />
            <span className="action-bar__label">Edit</span>
          </Button>
          <Button aria-label="Export" size="sm" variant="ghost">
            <ArrowDownToLine />
            <span className="action-bar__label">Export</span>
          </Button>
          <Button aria-label="Archive" size="sm" variant="ghost">
            <Archive />
            <span className="action-bar__label">Archive</span>
          </Button>
          <Separator orientation="vertical" />
          <Button
            aria-label="Delete"
            className="text-danger bg-danger/10"
            size="sm"
            variant="ghost">
            <TrashBin />
            <span className="action-bar__label">Delete</span>
          </Button>
        </ActionBar.Content>
        <Separator />
        <ActionBar.Suffix>
          <Tooltip>
            <Button
              isIconOnly
              aria-label="Clear selection"
              size="sm"
              variant="ghost"
              onPress={() => setSelected(new Set())}>
              <Xmark />
            </Button>
            <Tooltip.Content>Clear selection</Tooltip.Content>
          </Tooltip>
        </ActionBar.Suffix>
      </ActionBar>
    </div>
  )
}
