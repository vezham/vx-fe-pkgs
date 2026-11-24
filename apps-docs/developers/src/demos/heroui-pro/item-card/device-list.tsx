// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Display, ShieldCheck, Smartphone } from '@gravity-ui/icons'

import { ItemCard } from '@vezham/react-pro-v3'
import { Button, Chip } from '@vezham/react-v3'

export function DeviceList() {
  return (
    <div className="w-[500px] space-y-2 rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Icon>
          <Smartphone />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>MacBook Pro</ItemCard.Title>
          <ItemCard.Description>
            Last active: 2 minutes ago
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Chip color="success" size="sm" variant="soft">
            Active
          </Chip>
        </ItemCard.Action>
      </ItemCard>

      <ItemCard>
        <ItemCard.Icon>
          <Display />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>iMac</ItemCard.Title>
          <ItemCard.Description>Last active: 3 days ago</ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="outline">
            Revoke
          </Button>
        </ItemCard.Action>
      </ItemCard>

      <ItemCard>
        <ItemCard.Icon>
          <ShieldCheck />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>iPhone 15 Pro</ItemCard.Title>
          <ItemCard.Description>Last active: 1 hour ago</ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="outline">
            Revoke
          </Button>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
