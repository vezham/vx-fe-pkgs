// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSwitch } from '@vezham/react-pro-v3'

export function SettingsGroup() {
  const [animations, setAnimations] = useState(true)
  const [sounds, setSounds] = useState(false)
  const [haptics, setHaptics] = useState(true)

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSwitch
        aria-label="Animations"
        isSelected={animations}
        onChange={setAnimations}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Animations</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>

      <CellSwitch aria-label="Sounds" isSelected={sounds} onChange={setSounds}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Sounds</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>

      <CellSwitch
        aria-label="Haptics"
        isSelected={haptics}
        onChange={setHaptics}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Haptics</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
    </div>
  )
}
