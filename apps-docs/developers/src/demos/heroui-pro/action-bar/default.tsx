// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Archive,
  ArrowDownToLine,
  Pencil,
  TrashBin,
  Xmark
} from '@gravity-ui/icons'
import { useState } from 'react'
import type { Selection } from 'react-aria-components/GridList'

import { ActionBar, ListView } from '@vezham/react-pro-v3'
import { Button, Chip, Separator, Tooltip } from '@vezham/react-v3'

const items = [
  { id: 1, label: 'Project proposal.pdf' },
  { id: 2, label: 'Q4 financial report.xlsx' },
  { id: 3, label: 'Brand guidelines.fig' },
  { id: 4, label: 'Team photo.jpg' },
  { id: 5, label: 'Meeting notes.md' },
  { id: 6, label: 'API documentation.pdf' }
]

export function Default() {
  const [selected, setSelected] = useState<Selection>(new Set())

  const selectionCount =
    selected === 'all' ? items.length : (selected as Set<number>).size

  return (
    <div className="w-full max-w-lg p-4">
      <ListView
        aria-label="Files"
        items={items}
        selectedKeys={selected}
        selectionMode="multiple"
        variant="primary"
        onSelectionChange={setSelected}>
        {item => (
          <ListView.Item id={item.id} textValue={item.label}>
            <ListView.ItemContent>
              <ListView.Title>{item.label}</ListView.Title>
            </ListView.ItemContent>
          </ListView.Item>
        )}
      </ListView>

      <ActionBar isOpen={selectionCount > 0}>
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
