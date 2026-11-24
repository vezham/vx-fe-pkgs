// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Cloud, Key as KeyIcon, Person } from '@gravity-ui/icons'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { Button, Separator } from '@vezham/react-v3'

export function List() {
  return (
    <ItemCardGroup className="w-[500px]">
      <ItemCard>
        <ItemCard.Icon>
          <Person />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Profile</ItemCard.Title>
          <ItemCard.Description>
            Update your personal information
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="outline">
            Update
          </Button>
        </ItemCard.Action>
      </ItemCard>
      <Separator />
      <ItemCard>
        <ItemCard.Icon>
          <KeyIcon />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Security</ItemCard.Title>
          <ItemCard.Description>Manage passwords and 2FA</ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </ItemCard.Action>
      </ItemCard>
      <Separator />
      <ItemCard>
        <ItemCard.Icon>
          <Cloud />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Cloud sync</ItemCard.Title>
          <ItemCard.Description>
            Sync data across your devices
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="outline">
            Sync
          </Button>
        </ItemCard.Action>
      </ItemCard>
    </ItemCardGroup>
  )
}
