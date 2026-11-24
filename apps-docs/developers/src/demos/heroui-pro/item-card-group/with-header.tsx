// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Globe, Moon, Palette } from '@gravity-ui/icons'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { Button, Switch } from '@vezham/react-v3'

export function WithHeader() {
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCardGroup>
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>General</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Manage your basic account settings
          </ItemCardGroup.Description>
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

        <ItemCard>
          <ItemCard.Icon>
            <Palette />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Theme</ItemCard.Title>
            <ItemCard.Description>
              Choose light or dark mode
            </ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <Button size="sm" variant="outline">
              System
            </Button>
          </ItemCard.Action>
        </ItemCard>

        <ItemCard>
          <ItemCard.Icon>
            <Moon />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>Dark mode</ItemCard.Title>
            <ItemCard.Description>Override system theme</ItemCard.Description>
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
