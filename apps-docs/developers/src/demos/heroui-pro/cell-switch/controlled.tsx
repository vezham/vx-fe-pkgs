// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSwitch } from '@vezham/react-pro-v3'

export function Controlled() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSwitch
        aria-label="Animations"
        isSelected={enabled}
        onChange={setEnabled}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Animations</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
      <p className="text-muted px-1 text-sm">
        Animations: {enabled ? 'On' : 'Off'}
      </p>
    </div>
  )
}
