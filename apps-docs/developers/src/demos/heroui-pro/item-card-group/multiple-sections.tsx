// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChevronRight,
  Globe,
  Key as KeyIcon,
  Moon,
  Person
} from '@gravity-ui/icons'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { Button, Separator, Switch } from '@vezham/react-v3'

export function MultipleSections() {
  return (
    <div className="flex w-[500px] flex-col gap-6 rounded-2xl p-6">
      <ItemCardGroup>
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Account</ItemCardGroup.Title>
        </ItemCardGroup.Header>

        <ItemCard>
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
        <ItemCard>
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

      <ItemCardGroup>
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Preferences</ItemCardGroup.Title>
        </ItemCardGroup.Header>

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
            </Button>
          </ItemCard.Action>
        </ItemCard>
        <Separator />
        <ItemCard>
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
            <Switch aria-label="Switch Dark mode">
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </ItemCard.Action>
        </ItemCard>
      </ItemCardGroup>
    </div>
  )
}
