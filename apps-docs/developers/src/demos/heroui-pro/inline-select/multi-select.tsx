// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { InlineSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

export function MultiSelect() {
  const [channels, setChannels] = useState<Key[]>(['email', 'push'])

  return (
    <InlineSelect
      aria-label="Notification channels"
      selectionMode="multiple"
      value={channels}
      onChange={keys => setChannels(keys as Key[])}>
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-48 max-w-48 min-w-48">
        <ListBox selectionMode="multiple">
          <ListBox.Item id="email" textValue="Email">
            Email
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="whatsapp" textValue="WhatsApp">
            WhatsApp
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="push" textValue="Push Notification">
            Push Notification
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  )
}
