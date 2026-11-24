// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

const themes = [
  { id: 'default', name: 'Default' },
  { id: 'dark', name: 'Dark' },
  { id: 'system', name: 'System' }
]

export function Controlled() {
  const [theme, setTheme] = useState<Key | null>('default')

  const selectedTheme = themes.find(t => t.id === theme)

  return (
    <div className="flex w-[252px] flex-col gap-2">
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
            {themes.map(t => (
              <ListBox.Item key={t.id} id={t.id} textValue={t.name}>
                {t.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
      <p className="text-muted px-1 text-sm">
        Selected: {selectedTheme?.name ?? 'None'}
      </p>
    </div>
  )
}
