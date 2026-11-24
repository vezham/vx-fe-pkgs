// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'roboto', name: 'Roboto' },
  { id: 'system', name: 'System' },
  { id: 'georgia', name: 'Georgia' }
]

export function FontFamily() {
  const [heading, setHeading] = useState<Key | null>('inter')
  const [body, setBody] = useState<Key | null>('inter')

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <span className="text-muted text-sm">Font Family</span>
      <CellSelect
        aria-label="Heading font"
        value={heading}
        onChange={v => setHeading(v)}>
        <CellSelect.Trigger>
          <CellSelect.Label>Heading</CellSelect.Label>
          <CellSelect.Value>
            {({ defaultChildren, isPlaceholder, state }: any) => {
              if (isPlaceholder || state.selectedItems.length === 0)
                return defaultChildren

              const selected = fonts.find(
                f => f.id === state.selectedItems[0]?.key
              )

              if (!selected) return defaultChildren

              return (
                <span className="flex items-center justify-end gap-1.5 text-end">
                  {selected.name}
                  <span className="text-foreground text-sm font-medium">
                    Ag
                  </span>
                </span>
              )
            }}
          </CellSelect.Value>
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            {fonts.map(font => (
              <ListBox.Item key={font.id} id={font.id} textValue={font.name}>
                {font.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>

      <CellSelect
        aria-label="Body font"
        value={body}
        variant="secondary"
        onChange={v => setBody(v)}>
        <CellSelect.Trigger>
          <CellSelect.Label>Body</CellSelect.Label>
          <CellSelect.Value>
            {({ defaultChildren, isPlaceholder, state }: any) => {
              if (isPlaceholder || state.selectedItems.length === 0)
                return defaultChildren

              const selected = fonts.find(
                f => f.id === state.selectedItems[0]?.key
              )

              if (!selected) return defaultChildren

              return (
                <span className="flex items-center justify-end gap-1.5 text-end">
                  {selected.name}
                  <span className="text-foreground text-sm font-medium">
                    Ag
                  </span>
                </span>
              )
            }}
          </CellSelect.Value>
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            {fonts.map(font => (
              <ListBox.Item key={font.id} id={font.id} textValue={font.name}>
                {font.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
    </div>
  )
}
