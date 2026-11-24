// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSlider } from '@vezham/react-pro-v3'

export function IntegerStep() {
  const [volume, setVolume] = useState(75)

  return (
    <div className="w-[252px]">
      <CellSlider
        aria-label="Volume"
        maxValue={100}
        minValue={0}
        step={1}
        value={volume}
        onChange={v => setVolume(v as number)}>
        <CellSlider.Track>
          <CellSlider.Fill />
          <CellSlider.Thumb />
          <CellSlider.Label>Volume</CellSlider.Label>
          <CellSlider.Output />
        </CellSlider.Track>
      </CellSlider>
    </div>
  )
}
