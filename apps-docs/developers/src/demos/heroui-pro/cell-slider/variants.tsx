// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellSlider } from '@vezham/react-pro-v3'

export function Variants() {
  const variants = ['default', 'secondary'] as const

  return (
    <div className="flex w-[252px] flex-col gap-3">
      {variants.map(variant => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="text-muted text-xs">{variant}</span>
          <CellSlider
            aria-label="Spacing"
            defaultValue={0.5}
            formatOptions={{
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }}
            maxValue={1}
            minValue={0}
            step={0.01}
            variant={variant}>
            <CellSlider.Track>
              <CellSlider.Fill />
              <CellSlider.Thumb />
              <CellSlider.Label>Spacing</CellSlider.Label>
              <CellSlider.Output />
            </CellSlider.Track>
          </CellSlider>
        </div>
      ))}
    </div>
  )
}
