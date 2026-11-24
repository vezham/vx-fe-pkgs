// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Display, ShieldCheck, Smartphone } from '@gravity-ui/icons'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'

export function GridThreeColumns() {
  return (
    <div className="w-[720px] rounded-2xl p-6">
      <ItemCardGroup columns={3} layout="grid">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Devices</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Manage your connected devices
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>

        <ItemCard>
          <ItemCard.Icon>
            <Smartphone />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>MacBook Pro</ItemCard.Title>
            <ItemCard.Description>Active now</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <Display />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>iMac</ItemCard.Title>
            <ItemCard.Description>3 days ago</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <ShieldCheck />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>iPhone 15</ItemCard.Title>
            <ItemCard.Description>1 hour ago</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>
      </ItemCardGroup>
    </div>
  )
}
