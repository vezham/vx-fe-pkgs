// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  ChevronRight,
  Cloud,
  Globe,
  Key as KeyIcon,
  Moon,
  Palette,
  Person,
  ShieldCheck,
  Smartphone
} from '@gravity-ui/icons'

import {
  ItemCard,
  ItemCardGroup,
  PressableFeedback
} from '@vezham/react-pro-v3'
import { Separator } from '@vezham/react-v3'

export function Variants() {
  return (
    <div className="flex w-[500px] flex-col gap-6 p-6">
      <ItemCardGroup className="overflow-hidden" variant="default">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Default</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Surface background with shadow
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
      </ItemCardGroup>

      <ItemCardGroup className="overflow-hidden" variant="secondary">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Secondary</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Secondary surface, no shadow
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
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
            <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
          </ItemCard.Action>
        </ItemCard>
        <Separator />
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
          <ItemCard.Icon>
            <Palette />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Appearance</ItemCard.Title>
            <ItemCard.Description>Theme and colors</ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
          </ItemCard.Action>
        </ItemCard>
      </ItemCardGroup>

      <ItemCardGroup className="overflow-hidden" variant="tertiary">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Tertiary</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Tertiary surface, no shadow
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
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
        <Separator />
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
          <ItemCard.Icon>
            <Moon />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Dark mode</ItemCard.Title>
            <ItemCard.Description>
              Use dark theme across the app
            </ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
          </ItemCard.Action>
        </ItemCard>
      </ItemCardGroup>

      <ItemCardGroup className="overflow-hidden" variant="outline">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Outline</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Transparent with border, no shadow
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
          <ItemCard.Icon>
            <Smartphone />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Devices</ItemCard.Title>
            <ItemCard.Description>
              Manage connected devices
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
            <ShieldCheck />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Privacy</ItemCard.Title>
            <ItemCard.Description>
              Control your data and privacy
            </ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
          </ItemCard.Action>
        </ItemCard>
      </ItemCardGroup>

      <ItemCardGroup className="overflow-hidden" variant="transparent">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Transparent</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            No background, no border, no shadow
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        <ItemCard<'button'>
          className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          render={props => <button type="button" {...props} />}>
          <PressableFeedback.Ripple />
          <ItemCard.Icon>
            <Bell />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Notifications</ItemCard.Title>
            <ItemCard.Description>
              Manage alert preferences
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
            <Globe />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Region</ItemCard.Title>
            <ItemCard.Description>
              Set your locale and timezone
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
