// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Globe, Key as KeyIcon, Palette, Person } from '@gravity-ui/icons'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'

export function Grid() {
  return (
    <div className="w-[600px] rounded-2xl p-6">
      <ItemCardGroup layout="grid">
        <ItemCard>
          <ItemCard.Icon>
            <Person />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Profile</ItemCard.Title>
            <ItemCard.Description>Personal info</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <KeyIcon />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Security</ItemCard.Title>
            <ItemCard.Description>2FA & passwords</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <Globe />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Language</ItemCard.Title>
            <ItemCard.Description>English (US)</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <Palette />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Appearance</ItemCard.Title>
            <ItemCard.Description>Theme & colors</ItemCard.Description>
          </ItemCard.Content>
        </ItemCard>
      </ItemCardGroup>
    </div>
  )
}
