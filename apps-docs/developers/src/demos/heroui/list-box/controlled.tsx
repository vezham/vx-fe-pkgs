// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Check } from '@gravity-ui/icons'
import { useState } from 'react'

import type { Selection } from '@vezham/react-v3'
import { Avatar, Description, Label, ListBox, Surface } from '@vezham/react-v3'

export function Controlled() {
  const [selected, setSelected] = useState<Selection>(new Set(['1']))

  const selectedItems = Array.from(selected)

  return (
    <div className="space-y-4">
      <Surface className="shadow-surface w-[256px] rounded-3xl">
        <ListBox
          aria-label="Users"
          selectedKeys={selected}
          selectionMode="multiple"
          onSelectionChange={setSelected}>
          <ListBox.Item id="1" textValue="Bob">
            <Avatar size="sm">
              <Avatar.Image
                alt="Bob"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback>B</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <Label>Bob</Label>
              <Description>bob@heroui.com</Description>
            </div>
            <ListBox.ItemIndicator>
              {({ isSelected }) =>
                isSelected ? (
                  <Check className="text-accent-soft-foreground size-4" />
                ) : null
              }
            </ListBox.ItemIndicator>
          </ListBox.Item>
          <ListBox.Item id="2" textValue="Fred">
            <Avatar size="sm">
              <Avatar.Image
                alt="Fred"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
              />
              <Avatar.Fallback>F</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <Label>Fred</Label>
              <Description>fred@heroui.com</Description>
            </div>
            <ListBox.ItemIndicator>
              {({ isSelected }) =>
                isSelected ? (
                  <Check className="text-accent-soft-foreground size-4" />
                ) : null
              }
            </ListBox.ItemIndicator>
          </ListBox.Item>
          <ListBox.Item id="3" textValue="Martha">
            <Avatar size="sm">
              <Avatar.Image
                alt="Martha"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
              />
              <Avatar.Fallback>M</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <Label>Martha</Label>
              <Description>martha@heroui.com</Description>
            </div>
            <ListBox.ItemIndicator>
              {({ isSelected }) =>
                isSelected ? (
                  <Check className="text-accent-soft-foreground size-4" />
                ) : null
              }
            </ListBox.ItemIndicator>
          </ListBox.Item>
        </ListBox>
      </Surface>
      <p className="text-muted text-sm">
        Selected: {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}
      </p>
    </div>
  )
}
