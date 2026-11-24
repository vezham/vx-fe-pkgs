// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSwitch } from '@vezham/react-pro-v3'
import { Chip } from '@vezham/react-v3'

export function FeatureAnnouncement() {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div className="w-[320px]">
      <CellSwitch
        aria-label="Try the new sidebar"
        className="border-border relative h-auto rounded-xl border"
        isSelected={isSelected}
        onChange={setIsSelected}>
        <CellSwitch.Trigger className="h-auto bg-transparent py-2 shadow-none">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="flex items-center gap-1 text-sm font-semibold">
              Try the new sidebar
              <Chip
                className="h-4 px-0.5 text-[10px]"
                color="accent"
                size="sm"
                variant="soft">
                <Chip.Label>New</Chip.Label>
              </Chip>
            </span>
            <span className="text-muted text-xs font-normal text-wrap">
              Keep your pages, meetings, and AI within reach.
            </span>
          </div>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
    </div>
  )
}
