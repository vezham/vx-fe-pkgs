// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { InlineSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

export function Default() {
  const [value, setValue] = useState<Key | null>('en')

  return (
    <InlineSelect
      aria-label="Language"
      value={value}
      onChange={v => setValue(v)}>
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-[140px]">
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
          <ListBox.Item id="ja" textValue="Japanese">
            Japanese
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  )
}
