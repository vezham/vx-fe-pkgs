// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import { Checkbox } from '@vezham/react-v3'

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        id="email-notifications"
        isSelected={isSelected}
        onChange={setIsSelected}>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Email notifications
        </Checkbox.Content>
      </Checkbox>
      <p className="text-muted text-sm">
        Status:{' '}
        <span className="font-medium">
          {isSelected ? 'Enabled' : 'Disabled'}
        </span>
      </p>
    </div>
  )
}
