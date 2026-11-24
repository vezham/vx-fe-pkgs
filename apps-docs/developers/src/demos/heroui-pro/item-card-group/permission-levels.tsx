// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { FolderOpen, Person, Receipt } from '@gravity-ui/icons'
import { useState } from 'react'

import { InlineSelect, ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { ListBox } from '@vezham/react-v3'

export function PermissionLevels() {
  const [docs, setDocs] = useState('edit')
  const [billing, setBilling] = useState('view')
  const [members, setMembers] = useState('manage')

  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCardGroup variant="transparent">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Permissions</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Control access levels for your team
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>

        <ItemCard>
          <ItemCard.Icon>
            <FolderOpen />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Documents</ItemCard.Title>
            <ItemCard.Description>Access to shared files</ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <InlineSelect
              aria-label="Documents permission"
              value={docs}
              onChange={value => setDocs(value as string)}>
              <InlineSelect.Trigger>
                <InlineSelect.Value />
                <InlineSelect.Indicator />
              </InlineSelect.Trigger>
              <InlineSelect.Popover>
                <ListBox>
                  <ListBox.Item id="view" textValue="View">
                    View
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="edit" textValue="Edit">
                    Edit
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="manage" textValue="Manage">
                    Manage
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </InlineSelect.Popover>
            </InlineSelect>
          </ItemCard.Action>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <Receipt />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Billing</ItemCard.Title>
            <ItemCard.Description>Payment and invoices</ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <InlineSelect
              aria-label="Billing permission"
              value={billing}
              onChange={value => setBilling(value as string)}>
              <InlineSelect.Trigger>
                <InlineSelect.Value />
                <InlineSelect.Indicator />
              </InlineSelect.Trigger>
              <InlineSelect.Popover>
                <ListBox>
                  <ListBox.Item id="none" textValue="None">
                    None
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="view" textValue="View">
                    View
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="manage" textValue="Manage">
                    Manage
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </InlineSelect.Popover>
            </InlineSelect>
          </ItemCard.Action>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <Person />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Members</ItemCard.Title>
            <ItemCard.Description>Team member management</ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <InlineSelect
              aria-label="Members permission"
              value={members}
              onChange={value => setMembers(value as string)}>
              <InlineSelect.Trigger>
                <InlineSelect.Value />
                <InlineSelect.Indicator />
              </InlineSelect.Trigger>
              <InlineSelect.Popover>
                <ListBox>
                  <ListBox.Item id="view" textValue="View">
                    View
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="invite" textValue="Invite">
                    Invite
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="manage" textValue="Manage">
                    Manage
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
