// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

export function SettingsGroup() {
  const [theme, setTheme] = useState<Key | null>('default')
  const [language, setLanguage] = useState<Key | null>('en')
  const [fontSize, setFontSize] = useState<Key | null>('md')

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSelect aria-label="Theme" value={theme} onChange={v => setTheme(v)}>
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

      <CellSelect
        aria-label="Language"
        value={language}
        onChange={v => setLanguage(v)}>
        <CellSelect.Trigger>
          <CellSelect.Label>Language</CellSelect.Label>
          <CellSelect.Value />
          <CellSelect.Indicator />
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            <ListBox.Item id="en" textValue="English">
              English
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="es" textValue="Spanish">
              Spanish
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="fr" textValue="French">
              French
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>

      <CellSelect
        aria-label="Font size"
        value={fontSize}
        onChange={v => setFontSize(v)}>
        <CellSelect.Trigger>
          <CellSelect.Label>Font size</CellSelect.Label>
          <CellSelect.Value />
          <CellSelect.Indicator />
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            <ListBox.Item id="sm" textValue="Small">
              Small
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="md" textValue="Medium">
              Medium
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="lg" textValue="Large">
              Large
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
    </div>
  )
}
