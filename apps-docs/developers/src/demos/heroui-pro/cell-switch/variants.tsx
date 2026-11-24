// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellSwitch } from '@vezham/react-pro-v3'

export function Variants() {
  const variants = ['default', 'secondary'] as const

  return (
    <div className="flex w-[252px] flex-col gap-3">
      {variants.map(variant => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="text-muted text-xs">{variant}</span>
          <CellSwitch defaultSelected aria-label="Animations" variant={variant}>
            <CellSwitch.Trigger>
              <CellSwitch.Label>Animations</CellSwitch.Label>
              <CellSwitch.Control />
            </CellSwitch.Trigger>
          </CellSwitch>
        </div>
      ))}
    </div>
  )
}
