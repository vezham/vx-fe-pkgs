// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { ContextMenu } from '@vezham/react-pro-v3'
import type { Selection } from '@vezham/react-v3'
import { Header, Label } from '@vezham/react-v3'

export function WithSelection() {
  const [selected, setSelected] = useState<Selection>(new Set(['grid']))

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
          Right-click to change view
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={setSelected}>
          <ContextMenu.Section>
            <Header>View</Header>
            <ContextMenu.Item id="grid" textValue="Grid">
              <ContextMenu.ItemIndicator />
              <Label>Grid</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="list" textValue="List">
              <ContextMenu.ItemIndicator />
              <Label>List</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="columns" textValue="Columns">
              <ContextMenu.ItemIndicator />
              <Label>Columns</Label>
            </ContextMenu.Item>
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}
