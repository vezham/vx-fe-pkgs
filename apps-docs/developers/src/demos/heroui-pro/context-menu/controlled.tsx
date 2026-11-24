// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { ContextMenu } from '@vezham/react-pro-v3'
import { Label } from '@vezham/react-v3'

export function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted text-sm">Menu is {open ? 'open' : 'closed'}</p>
      <ContextMenu open={open} onOpenChange={setOpen}>
        <ContextMenu.Trigger>
          <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
            Right-click here (controlled)
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Popover>
          <ContextMenu.Menu>
            <ContextMenu.Item id="action-1" textValue="Action 1">
              <Label>Action 1</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="action-2" textValue="Action 2">
              <Label>Action 2</Label>
            </ContextMenu.Item>
            <ContextMenu.Item id="action-3" textValue="Action 3">
              <Label>Action 3</Label>
            </ContextMenu.Item>
          </ContextMenu.Menu>
        </ContextMenu.Popover>
      </ContextMenu>
    </div>
  )
}
