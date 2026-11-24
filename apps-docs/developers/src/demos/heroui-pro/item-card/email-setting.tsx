// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Ellipsis, Pencil, Star, TrashBin } from '@gravity-ui/icons'

import { ItemCard } from '@vezham/react-pro-v3'
import {
  Button,
  Chip,
  Dropdown,
  Label,
  Separator,
  Tooltip
} from '@vezham/react-v3'

export function EmailSetting() {
  return (
    <div className="w-[600px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Content>
          <ItemCard.Title>
            junior@heroui.com
            <Chip className="ml-2 align-middle" size="sm" variant="soft">
              Primary
            </Chip>
          </ItemCard.Title>
          <ItemCard.Description>
            Notifications and account updates will be sent to this address.
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Dropdown>
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  aria-label="Actions"
                  size="sm"
                  variant="outline">
                  <Ellipsis className="size-4" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Actions</Tooltip.Content>
            </Tooltip>
            <Dropdown.Popover className="min-w-[180px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item textValue="Change Email">
                  <Pencil className="size-4" />
                  <Label>Change Email</Label>
                </Dropdown.Item>
                <Dropdown.Item textValue="Set as Primary">
                  <Star className="size-4" />
                  <Label>Set as Primary</Label>
                </Dropdown.Item>
                <Separator />
                <Dropdown.Item textValue="Remove Email">
                  <TrashBin className="text-danger size-4" />
                  <Label className="text-danger">Remove Email</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
