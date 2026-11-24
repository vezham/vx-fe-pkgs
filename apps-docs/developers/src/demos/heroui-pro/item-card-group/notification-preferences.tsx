// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Bell, Envelope, Megaphone } from '@gravity-ui/icons'
import { useState } from 'react'

import { InlineSelect, ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { ListBox, Separator } from '@vezham/react-v3'

export function NotificationPreferences() {
  const [invites, setInvites] = useState(['email', 'push'])
  const [reminders, setReminders] = useState(['email'])
  const [blasts, setBlasts] = useState(['email', 'push'])

  return (
    <div className="w-[550px] rounded-2xl p-6">
      <ItemCardGroup>
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Notification Preferences</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Choose how you receive notifications for each event type
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>

        <ItemCard>
          <ItemCard.Icon>
            <Envelope />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Event Invites</ItemCard.Title>
          </ItemCard.Content>
          <ItemCard.Action>
            <InlineSelect
              aria-label="Event Invites"
              selectionMode="multiple"
              value={invites}
              onChange={keys => setInvites(keys as string[])}>
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
        <Separator />
        <ItemCard>
          <ItemCard.Icon>
            <Bell />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Event Reminders</ItemCard.Title>
          </ItemCard.Content>
          <ItemCard.Action>
            <InlineSelect
              aria-label="Event Reminders"
              selectionMode="multiple"
              value={reminders}
              onChange={keys => setReminders(keys as string[])}>
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
                  <ListBox.Item id="push" textValue="Push Notification">
                    Push Notification
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </InlineSelect.Popover>
            </InlineSelect>
          </ItemCard.Action>
        </ItemCard>
        <Separator />
        <ItemCard>
          <ItemCard.Icon>
            <Megaphone />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Event Blasts</ItemCard.Title>
          </ItemCard.Content>
          <ItemCard.Action>
            <InlineSelect
              aria-label="Event Blasts"
              selectionMode="multiple"
              value={blasts}
              onChange={keys => setBlasts(keys as string[])}>
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
                  <ListBox.Item id="push" textValue="Push Notification">
                    Push Notification
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </InlineSelect.Popover>
            </InlineSelect>
          </ItemCard.Action>
        </ItemCard>
      </ItemCardGroup>
    </div>
  )
}
