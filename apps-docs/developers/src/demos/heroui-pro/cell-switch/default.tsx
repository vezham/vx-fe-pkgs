// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellSwitch } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="w-[252px]">
      <CellSwitch defaultSelected aria-label="Animations">
        <CellSwitch.Trigger>
          <CellSwitch.Label>Animations</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
    </div>
  )
}
