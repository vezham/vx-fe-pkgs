// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellSwitch } from '@vezham/react-pro-v3'

export function Disabled() {
  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSwitch defaultSelected isDisabled aria-label="Animations">
        <CellSwitch.Trigger>
          <CellSwitch.Label>Animations</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
      <CellSwitch isDisabled aria-label="Animations" defaultSelected={false}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Animations</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
    </div>
  )
}
