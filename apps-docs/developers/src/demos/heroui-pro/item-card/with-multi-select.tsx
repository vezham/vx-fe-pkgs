// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Bell } from '@gravity-ui/icons'
import { useState } from 'react'

import { InlineSelect, ItemCard } from '@vezham/react-pro-v3'
import { ListBox } from '@vezham/react-v3'

export function WithMultiSelect() {
  const [channels, setChannels] = useState<string[]>(['email', 'push'])

  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Icon>
          <Bell />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Event Invites</ItemCard.Title>
          <ItemCard.Description>
            Choose how you receive invitations
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <InlineSelect
            aria-label="Event Invites channels"
            selectionMode="multiple"
            value={channels}
            style={{
              // @ts-expect-error --inline-select-value-max-width is a custom property
              '--inline-select-value-max-width': '8rem'
            }}
            onChange={keys => setChannels(keys as string[])}>
            <InlineSelect.Trigger>
              <InlineSelect.Value />
              <InlineSelect.Indicator />
            </InlineSelect.Trigger>
            <InlineSelect.Popover>
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
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
