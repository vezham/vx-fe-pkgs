// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ContextMenu } from '@vezham/react-pro-v3'
import { Label } from '@vezham/react-v3'

export function LongPress() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
          Long-press here (touch devices)
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <ContextMenu.Item id="select" textValue="Select">
            <Label>Select</Label>
          </ContextMenu.Item>
          <ContextMenu.Item id="select-all" textValue="Select All">
            <Label>Select All</Label>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item id="cut" textValue="Cut">
            <Label>Cut</Label>
          </ContextMenu.Item>
          <ContextMenu.Item id="copy" textValue="Copy">
            <Label>Copy</Label>
          </ContextMenu.Item>
          <ContextMenu.Item id="paste" textValue="Paste">
            <Label>Paste</Label>
          </ContextMenu.Item>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}
