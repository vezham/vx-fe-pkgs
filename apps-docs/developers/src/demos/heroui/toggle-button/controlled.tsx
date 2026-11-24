// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Heart, HeartFill } from '@gravity-ui/icons'
import { useState } from 'react'

import { ToggleButton } from '@vezham/react-v3'

export function Controlled() {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
        {({ isSelected: selected }) => (
          <>
            {selected ? <HeartFill /> : <Heart />}
            {selected ? 'Liked' : 'Like'}
          </>
        )}
      </ToggleButton>
      <p className="text-muted text-sm">
        Status:{' '}
        <span className="font-medium">
          {isSelected ? 'Selected' : 'Not selected'}
        </span>
      </p>
    </div>
  )
}
