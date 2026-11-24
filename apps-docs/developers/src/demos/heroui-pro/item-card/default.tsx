// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleChevronRight, Globe } from '@gravity-ui/icons'

import { ItemCard } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function Default() {
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Icon>
          <Globe />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Language</ItemCard.Title>
          <ItemCard.Description>
            Choose your preferred language
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="outline">
            English
            <CircleChevronRight className="size-3.5 rtl:-scale-x-100" />
          </Button>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
