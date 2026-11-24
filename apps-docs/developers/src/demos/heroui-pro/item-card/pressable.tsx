// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChevronRight, Key as KeyIcon, Person } from '@gravity-ui/icons'

import { ItemCard, PressableFeedback } from '@vezham/react-pro-v3'

export function Pressable() {
  return (
    <div className="w-[500px] space-y-4 rounded-2xl p-6">
      <ItemCard<'button'>
        className="relative w-full cursor-pointer overflow-hidden"
        render={props => <button type="button" {...props} />}>
        <PressableFeedback.Highlight />
        <ItemCard.Icon>
          <Person />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Account settings</ItemCard.Title>
          <ItemCard.Description>
            Manage your account preferences
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>

      <ItemCard<'button'>
        className="relative w-full cursor-pointer overflow-hidden"
        render={props => <button type="button" {...props} />}>
        <PressableFeedback.Ripple />
        <ItemCard.Icon>
          <KeyIcon />
        </ItemCard.Icon>
        <ItemCard.Content className="w-full flex-1">
          <ItemCard.Title>Security</ItemCard.Title>
          <ItemCard.Description>
            Passwords and two-factor authentication
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
