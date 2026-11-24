// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChevronRight } from '@gravity-ui/icons'
import { useState } from 'react'

import { InlineSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

export function CustomIndicator() {
  const [role, setRole] = useState<Key | null>('editor')

  return (
    <InlineSelect aria-label="Role" value={role} onChange={v => setRole(v)}>
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator>
          <ChevronRight className="rtl:-scale-x-100" />
        </InlineSelect.Indicator>
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-[124px]">
        <ListBox>
          <ListBox.Item id="viewer" textValue="Viewer">
            Viewer
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="editor" textValue="Editor">
            Editor
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="admin" textValue="Admin">
            Admin
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  )
}
