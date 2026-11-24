// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Moon } from '@gravity-ui/icons'
import { useState } from 'react'

import { ItemCard } from '@vezham/react-pro-v3'
import { Switch } from '@vezham/react-v3'

export function WithSwitch() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="w-[500px] rounded-2xl p-6">
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
          <Switch
            aria-label="Switch Dark mode"
            isSelected={darkMode}
            onChange={setDarkMode}>
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
