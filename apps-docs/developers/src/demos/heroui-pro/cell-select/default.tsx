// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

export function Default() {
  const [theme, setTheme] = useState<Key | null>('default')

  return (
    <div className="w-[252px]">
      <CellSelect
        aria-label="Theme"
        value={theme}
        onChange={v => setTheme(v as Key | null)}>
        <CellSelect.Trigger>
          <CellSelect.Label>Theme</CellSelect.Label>
          <CellSelect.Value />
          <CellSelect.Indicator />
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            <ListBox.Item id="default" textValue="Default">
              Default
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="dark" textValue="Dark">
              Dark
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="system" textValue="System">
              System
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
    </div>
  )
}
