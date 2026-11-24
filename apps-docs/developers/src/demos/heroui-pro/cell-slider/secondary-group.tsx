// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSlider } from '@vezham/react-pro-v3'

export function SecondaryGroup() {
  const [spacing, setSpacing] = useState(0.5)
  const [fontSize, setFontSize] = useState(0.3)

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSlider
        aria-label="Spacing"
        formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
        maxValue={1}
        minValue={0}
        step={0.01}
        value={spacing}
        variant="secondary"
        onChange={v => setSpacing(v as number)}>
        <CellSlider.Track>
          <CellSlider.Fill />
          <CellSlider.Thumb />
          <CellSlider.Label>Spacing</CellSlider.Label>
          <CellSlider.Output />
        </CellSlider.Track>
      </CellSlider>
      <CellSlider
        aria-label="Font Size"
        formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
        maxValue={1}
        minValue={0}
        step={0.01}
        value={fontSize}
        variant="secondary"
        onChange={v => setFontSize(v as number)}>
        <CellSlider.Track>
          <CellSlider.Fill />
          <CellSlider.Thumb />
          <CellSlider.Label>Font Size</CellSlider.Label>
          <CellSlider.Output />
        </CellSlider.Track>
      </CellSlider>
    </div>
  )
}
