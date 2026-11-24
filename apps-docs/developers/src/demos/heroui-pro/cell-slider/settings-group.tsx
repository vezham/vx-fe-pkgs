// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSlider } from '@vezham/react-pro-v3'

export function SettingsGroup() {
  const [spacing, setSpacing] = useState(0.5)
  const [fontSize, setFontSize] = useState(0.3)
  const [radius, setRadius] = useState(0.5)
  const [fieldRadius, setFieldRadius] = useState(0.3)

  return (
    <div className="flex w-[252px] flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Density</span>
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
        <CellSlider
          aria-label="Font Size"
          formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
          maxValue={1}
          minValue={0}
          step={0.01}
          value={fontSize}
          onChange={v => setFontSize(v as number)}>
          <CellSlider.Track>
            <CellSlider.Fill />
            <CellSlider.Thumb />
            <CellSlider.Label>Font Size</CellSlider.Label>
            <CellSlider.Output />
          </CellSlider.Track>
        </CellSlider>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Corners</span>
        <CellSlider
          aria-label="General Radius"
          formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
          maxValue={1}
          minValue={0}
          step={0.01}
          value={radius}
          onChange={v => setRadius(v as number)}>
          <CellSlider.Track>
            <CellSlider.Fill />
            <CellSlider.Thumb />
            <CellSlider.Label>General Radius</CellSlider.Label>
            <CellSlider.Output />
          </CellSlider.Track>
        </CellSlider>
        <CellSlider
          aria-label="Forms Radius"
          formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
          maxValue={1}
          minValue={0}
          step={0.01}
          value={fieldRadius}
          onChange={v => setFieldRadius(v as number)}>
          <CellSlider.Track>
            <CellSlider.Fill />
            <CellSlider.Thumb />
            <CellSlider.Label>Forms Radius</CellSlider.Label>
            <CellSlider.Output />
          </CellSlider.Track>
        </CellSlider>
      </div>
    </div>
  )
}
