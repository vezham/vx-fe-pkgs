// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSlider } from '@vezham/react-pro-v3'

export function Controlled() {
  const [spacing, setSpacing] = useState(0.5)

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSlider
        aria-label="Spacing"
        formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
        maxValue={1}
        minValue={0}
        step={0.01}
        value={spacing}
        onChange={v => setSpacing(v as number)}>
        <CellSlider.Track>
          <CellSlider.Fill />
          <CellSlider.Thumb />
          <CellSlider.Label>Spacing</CellSlider.Label>
          <CellSlider.Output />
        </CellSlider.Track>
      </CellSlider>
      <p className="text-muted px-1 text-sm">Value: {spacing.toFixed(2)}</p>
    </div>
  )
}
