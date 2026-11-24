// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  ChevronRight,
  Globe,
  Key as KeyIcon,
  Moon,
  Palette
} from '@gravity-ui/icons'

import { ItemCard } from '@vezham/react-pro-v3'

export function Variants() {
  return (
    <div className="w-[500px] space-y-3 p-6">
      <ItemCard variant="default">
        <ItemCard.Icon>
          <Globe />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Default</ItemCard.Title>
          <ItemCard.Description>
            Surface background with shadow
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>

      <ItemCard variant="secondary">
        <ItemCard.Icon>
          <Palette />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Secondary</ItemCard.Title>
          <ItemCard.Description>
            Secondary surface, no shadow
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>

      <ItemCard variant="tertiary">
        <ItemCard.Icon>
          <Moon />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Tertiary</ItemCard.Title>
          <ItemCard.Description>
            Tertiary surface, no shadow
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>

      <ItemCard variant="outline">
        <ItemCard.Icon>
          <KeyIcon />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Outline</ItemCard.Title>
          <ItemCard.Description>
            Transparent with border, no shadow
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>

      <ItemCard variant="transparent">
        <ItemCard.Icon>
          <Bell />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Transparent</ItemCard.Title>
          <ItemCard.Description>
            No background, no border, no shadow
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
