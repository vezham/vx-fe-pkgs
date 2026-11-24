// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import React from 'react'

import { Switch } from '@vezham/react-v3'

export function Controlled() {
  const [isSelected, setIsSelected] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Switch isSelected={isSelected} onChange={setIsSelected}>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Enable notifications
        </Switch.Content>
      </Switch>
      <p className="text-muted text-sm">
        Switch is {isSelected ? 'on' : 'off'}
      </p>
    </div>
  )
}
