// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChevronRight, Cloud, Key as KeyIcon, Person } from '@gravity-ui/icons'

import {
  ItemCard,
  ItemCardGroup,
  PressableFeedback
} from '@vezham/react-pro-v3'
import { Separator } from '@vezham/react-v3'

export function Pressable() {
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCardGroup className="overflow-hidden">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Account</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Manage your account settings and preferences
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>

        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
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
        <Separator />
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
          <ItemCard.Icon>
            <KeyIcon />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Security</ItemCard.Title>
            <ItemCard.Description>
              Manage passwords and 2FA
            </ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
          </ItemCard.Action>
        </ItemCard>
        <Separator />
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
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
            <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
          </ItemCard.Action>
        </ItemCard>
      </ItemCardGroup>
    </div>
  )
}
