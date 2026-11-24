// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChevronRight, Person } from '@gravity-ui/icons'

import { ItemCard, PressableFeedback } from '@vezham/react-pro-v3'

export function StandaloneHighlight() {
  return (
    <div className="w-[500px]">
      <ItemCard<'button'>
        className="relative w-full cursor-pointer overflow-hidden"
        render={props => <button type="button" {...props} />}>
        <PressableFeedback.Highlight />
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
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
