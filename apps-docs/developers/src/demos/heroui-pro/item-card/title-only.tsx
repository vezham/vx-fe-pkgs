// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleChevronRight, Palette } from '@gravity-ui/icons'

import { ItemCard } from '@vezham/react-pro-v3'

export function TitleOnly() {
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Icon>
          <Palette />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Appearance</ItemCard.Title>
        </ItemCard.Content>
        <ItemCard.Action>
          <CircleChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
