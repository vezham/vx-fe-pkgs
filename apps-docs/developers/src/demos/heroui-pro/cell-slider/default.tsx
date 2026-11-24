// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellSlider } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="w-[252px]">
      <CellSlider
        aria-label="Spacing"
        defaultValue={0.5}
        formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
        maxValue={1}
        minValue={0}
        step={0.01}>
        <CellSlider.Track>
          <CellSlider.Fill />
          <CellSlider.Thumb />
          <CellSlider.Label>Spacing</CellSlider.Label>
          <CellSlider.Output />
        </CellSlider.Track>
      </CellSlider>
    </div>
  )
}
